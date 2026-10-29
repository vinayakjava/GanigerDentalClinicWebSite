# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Bilingual (English/Kannada) website for Dr. Ganiger's Multispeciality Dental Clinic & Implant Center (Athani and Ainapur
branches). Phase 1 is a public website plus an appointment *request* form that emails the clinic — no database, no login.
Phase 2 (planned in `PHASED_IMPLEMENTATION_PLAN.md`) adds Supabase storage and an admin area.

Rules that override convenience (full list in `CONSTITUTION.md`):
- Publish only facts listed in `ASSETS.md` (doctor details, addresses, hours, services). Never invent qualifications,
  testimonials, prices, success rates or medical claims. The original posters/card are in `assets/reference/`.
- Online submissions are requests, never confirmed bookings — keep that wording on the form and in the email.
- Collect only name, mobile, branch, optional date and optional short reason. No detailed medical history.
- Kannada text in `kn.json` that did not come from the clinic's own posters needs native-speaker review.

## Commands

```bash
npm run dev          # http://localhost:3000
npm run build        # production build; also proves every page prerenders
npm run lint
npm run typecheck
npm test             # Vitest, runs once
npx vitest run lib/appointment.test.ts -t "Sundays"   # single test
npm run test:e2e     # Playwright: builds, starts a production server on :3200, runs desktop + mobile projects
npx playwright test e2e/appointment.spec.ts --project=desktop -g "Kannada"   # single e2e test
```

On this machine Playwright's Chromium download is blocked, so run e2e with the installed Chrome:
`PLAYWRIGHT_CHANNEL=chrome npm run test:e2e`. Stop any `next dev` for this project first — Next refuses to build/run a
second server alongside it.

`APPOINTMENT_EMAIL_DRY_RUN=true` prints appointment requests to the server console instead of emailing them (use it in
`.env.local`; the e2e config sets it). Without it, missing Resend config makes the form report a delivery error.

## Architecture

Next.js 16 App Router with `cacheComponents` enabled, React 19, Tailwind CSS 4 (theme tokens in `app/globals.css`
`@theme`, no tailwind.config). Next 16 differs from older versions — check `node_modules/next/dist/docs/` before using an
API (e.g. `proxy.ts` replaced `middleware.ts`; `dynamicParams` is unavailable with cache components).

- **i18n without a library.** The root layout is `app/[lang]/layout.tsx`; `generateStaticParams` emits `en` and `kn`, so
  every page is static. Server code reads the locale via `getLocale()`/`getDictionary()` in `app/[lang]/dictionaries.ts`,
  which use `next/root-params` (no prop drilling). Strings live in `app/[lang]/dictionaries/{en,kn}.json`; `kn.json` must
  have exactly the same shape as `en.json` (enforced by the `Dictionary` type). Client components can't use root params,
  so pages pass them the strings they need.
- Unmatched URLs hit `app/[lang]/[...missing]/page.tsx`, which calls `notFound()` so the localized
  `app/[lang]/not-found.tsx` renders inside the normal layout.
- **`proxy.ts`** redirects any path without a locale prefix to `/en/...` (or `/kn/...` when Accept-Language starts with
  `kn`). Its matcher excludes `_next`, `/images/`, icons, `sitemap.xml` and `robots.txt` — add new public paths there.
- **Clinic facts** (phones, branch ids, closed weekdays, service ids, map queries) are in `lib/clinic.ts`; display text
  for them is in the dictionaries keyed by those ids. The doctor's education, conferences and publications are in
  `lib/doctor.ts`; their proper names stay English in both locales (rendered with `lang="en"`).
- **Appointment flow:** `components/appointment-form.tsx` (client, `useActionState`) → server action
  `app/[lang]/contact/actions.ts` → `lib/appointment.ts` (zod validation returning error *codes*, which the client maps
  to dictionary messages) → `lib/rate-limit.ts` → `lib/email.ts` (Resend, plain-text only). Dates are validated against
  the Indian calendar date and the branch's closed weekdays (Ainapur closes Sunday). National holidays are not modelled.
- **Duplicate protection:** the form generates a UUID once per submission attempt and the action passes it to Resend as
  `idempotencyKey`, so retries/double-clicks send one email. The in-memory rate limit is per serverless instance only.
- `lib/appointment-email.ts` holds the pure email formatter so tests don't import the `server-only` Resend module.

## Environment

See `.env.example`: `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `APPOINTMENT_EMAIL_FROM`, `APPOINTMENT_EMAIL_TO`.
Resend can only send to arbitrary inboxes from a verified domain, so a domain is a launch requirement.
Production: Netlify (free plan) builds from GitHub `main` (vinayakjava/GanigerDentalClinicWebSite); the domain is
`ganigerdentalclinic.in` (DNS at GoDaddy). Production env vars are set in Netlify, never committed.
