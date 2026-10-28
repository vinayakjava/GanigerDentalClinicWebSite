# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**Project:** Dr. Ganiger's Multispeciality Dental Clinic Website  
**Type:** Responsive, informational website (not a web application)  
**Operator:** Dr. Lakkappa S Ganiger, BDS, MDS, Prosthodontist & Oral Implantologist  
**Branches:** Athani (10 AM - 5 PM, 7 days) & Ainapur (6 PM - 8:30 PM, Mon-Sat)  
**Launch Languages:** English and Kannada  
**Status:** Specification confirmed, ready for implementation

---

## Project Files & Documentation

### Foundation Documents
- **CONSTITUTION.md** — 14 engineering principles guiding all decisions. Prioritizes patient privacy, security, accessibility, and simplicity.
- **SPECIFICATION.md** — Business rules and operational constraints. Includes clinic hours, contact info, appointment request model.
- **ASSETS.md** — Doctor info, branding guidelines, collected assets (logo, photos, brochures).

**All decisions must align with CONSTITUTION.md principles. These are not negotiable.**

---

## Architecture & Stack

### Recommended Technology Stack (for simplicity & maintainability)

**Frontend Framework:** Next.js (App Router)
- Static generation (SSG) for all pages
- Mobile-first responsive design
- Built-in SEO and image optimization
- TypeScript strict mode enforced

**Styling:** TailwindCSS
- Utility-first, maintainable CSS
- Dark mode support
- Accessibility-first utilities

**Form Handling:** React Hook Form + Server Actions
- Client validation with immediate feedback
- Server-side validation on form submission
- No complex state management needed

**Internationalization (i18n):** next-intl or next-i18next
- Bilingual English/Kannada support
- Easy to add translations without code changes
- URL-based language selection (/en, /kn)

**Database:** None for MVP
- Simple contact form emails to clinic (Resend or similar)
- No appointment storage or scheduling logic
- Clinic confirms all requests via phone/WhatsApp

**Email Service:** Resend or SendGrid
- Transactional email for contact form submissions
- Send confirmation email to clinic and customer acknowledgement to patient

**Deployment:** Vercel
- Zero-config deployment from git
- Edge functions for form handling
- Free tier sufficient for website traffic
- Automatic HTTPS and domain configuration

### Why This Stack?
- **Simple:** Each tool has one clear purpose; minimal configuration
- **Maintainable:** TypeScript catches errors early; clear component structure
- **Fast:** SSG generates static HTML; minimal JavaScript on client
- **SEO-Friendly:** Built-in meta tags, structured data, image optimization
- **Accessible:** TailwindCSS utilities encourage WCAG compliance; semantic HTML enforced
- **Scalable:** Easy to add features (blog, gallery, etc.) without architectural changes

---

## Project Structure

```
dr-ganiger-dental/
├── CONSTITUTION.md           # Engineering principles (read first)
├── SPECIFICATION.md          # Business rules and clinic info
├── ASSETS.md                 # Branding, doctor bio, asset mapping
├── CLAUDE.md                 # This file
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout (header, footer, lang selector)
│   ├── page.tsx             # Home page
│   ├── [lang]/              # Language-specific routes
│   │   ├── layout.tsx       # Language-scoped layout
│   │   ├── page.tsx         # Home (translated)
│   │   ├── about/           # About doctor and clinic
│   │   ├── services/        # Treatment services
│   │   ├── contact/         # Contact and appointment request form
│   │   └── privacy/         # Privacy policy
│   └── api/
│       └── contact/         # Form submission endpoint
├── components/              # Reusable React components
│   ├── Header.tsx          # Navigation and logo
│   ├── Footer.tsx          # Footer with contact info
│   ├── Hero.tsx            # Hero section with doctor photo
│   ├── Services.tsx        # Services grid
│   ├── ContactForm.tsx     # Appointment request form
│   ├── BranchCard.tsx      # Branch info (Athani, Ainapur)
│   └── LanguageSelector.tsx # Language switcher
├── lib/
│   ├── i18n.ts            # i18n configuration and helpers
│   ├── email.ts           # Email sending utilities
│   ├── validation.ts      # Form validation schemas (Zod)
│   └── constants.ts       # Clinic info, contact, hours
├── public/
│   ├── logo.svg           # Clinic logo (from ASSETS.md)
│   ├── images/
│   │   ├── doctor.jpg     # Doctor photo
│   │   └── clinic/        # Clinic interior photos (if available)
│   └── icons/             # Small icon assets
├── messages/              # Translation files
│   ├── en.json           # English translations
│   └── kn.json           # Kannada translations
├── styles/
│   └── globals.css       # Global styles (TailwindCSS)
├── tailwind.config.ts    # TailwindCSS configuration
├── tsconfig.json         # TypeScript strict mode
├── next.config.ts        # Next.js configuration
├── .env.example          # Environment variables template
├── .env.local            # Local env vars (git ignored)
└── package.json          # Dependencies
```

### Key Files & Responsibilities

| File | Purpose |
|------|---------|
| `CONSTITUTION.md` | **Must read first.** Engineering principles and constraints. Non-negotiable. |
| `SPECIFICATION.md` | Clinic operating hours, contact info, appointment request model. Reference for content. |
| `ASSETS.md` | Doctor bio, branding colors, asset references. Use for design consistency. |
| `app/layout.tsx` | Root layout with header/footer, language selector, global styles |
| `app/[lang]/page.tsx` | Home page hero with doctor photo, clinic info, and appointment CTA |
| `lib/constants.ts` | Single source of truth: clinic hours, branches, contact info, doctor qualifications |
| `messages/en.json` | All English UI text, labels, and content |
| `messages/kn.json` | All Kannada UI text, labels, and content |
| `components/ContactForm.tsx` | Simple appointment request form (name, phone, date preference) |

---

## Common Development Tasks

### Initial Setup
```bash
npm install
npm run dev
# Opens http://localhost:3000 in browser
```

### Add or Edit Translation
1. Update `messages/en.json` and `messages/kn.json` with new text
2. Use `t('key')` in components to reference translations
3. No rebuild needed for next-intl

### Update Clinic Information
1. Edit `lib/constants.ts` with new hours, phone, email, addresses
2. All pages automatically use updated info
3. Search `constants` in code to find all places it's referenced

### Design & Branding
1. Clinic logo: Place in `public/logo.svg` and reference in `Header.tsx`
2. Colors: Define in `tailwind.config.ts` under `colors` theme
3. Fonts: Configure in `next.config.ts` (Google Fonts for Telugu/Kannada support)
4. Images: Optimize using Next.js `Image` component (auto-resizing, lazy-loading)

### Add a New Page
1. Create folder: `app/[lang]/new-page/`
2. Create `page.tsx` in that folder
3. Add route to header navigation in `components/Header.tsx`
4. Add translation key to `messages/en.json` and `messages/kn.json`
5. Wrap page in semantic HTML (`<main>`, `<article>`, etc.)

### Test Accessibility
```bash
npm run build  # Check for TypeScript and build errors
# Open in browser and test:
# - Keyboard navigation (Tab, Enter, Escape)
# - Screen reader (NVDA, JAWS, or browser tools)
# - Color contrast (Chrome DevTools > Accessibility)
```

### Deploy to Production
```bash
git add .
git commit -m "Description of changes"
git push origin main
# Vercel automatically deploys on git push
```

---

## Brand & Design Guidelines

### Color Palette
- **Primary Navy:** `#003D7A` or `#0052CC` (headers, buttons, text)
- **Accent Orange:** `#FF9F1C` or `#FF7A00` (highlights, CTAs, hover states)
- **White:** `#FFFFFF` (backgrounds, text contrast)
- **Gray:** `#F3F4F6` for subtle backgrounds, `#6B7280` for secondary text

**Accessibility:** All text meets WCAG AA contrast (4.5:1 for body, 3:1 for large text).

### Typography
- **Headings:** Clean, sans-serif (e.g., Inter, Roboto, Poppins)
- **Body:** Readable sans-serif with good line-height (1.6)
- **Kannada:** Use web-safe fonts with Kannada support (e.g., Noto Sans Kannada)

### Layout
- Mobile-first responsive (320px → 768px → 1024px → 1440px)
- Generous spacing (margins, padding) for clarity
- Single-column on mobile, multi-column on desktop
- Clear visual hierarchy (size, color, spacing)

### Doctor & Clinic Identity
- Professional, trustworthy aesthetic
- Warm, approachable (not clinical or cold)
- Use doctor photo prominently on home and about pages
- Display clinic logo in header (always) and footer
- Show both branch locations clearly with hours

### Call-to-Action (CTA) Buttons
- Orange background with white text (or navy background with orange text)
- Prominent placement in hero and services sections
- WhatsApp button with WhatsApp icon + phone number
- "Request Appointment" or "Contact Clinic" text (not medical claims)

---

## Important Constraints from CONSTITUTION.md

### Patient Privacy & Security
- **Never collect medical information** in appointment form (only name, phone, date preference)
- Contact form emails clinic staff directly (SMTP)
- No patient database or user accounts on website
- No cookies or tracking without explicit consent

### Content Authenticity
- **Only publish information provided by Dr. Ganiger or clinic staff**
- No invented qualifications, success rates, testimonials, or services
- No medical claims ("whitens in 2 weeks", "guaranteed success")
- Use exact doctor title and qualifications: "BDS, MDS, Prosthodontist & Oral Implantologist"

### Accessibility
- WCAG 2.1 AA minimum (color contrast, keyboard nav, screen readers)
- Semantic HTML (`<button>`, `<nav>`, `<main>`, `<article>`)
- Alt text for all images
- Form labels tied to inputs (`<label htmlFor="...">`)
- No functionality requires mouse-only interaction

### Responsive Design
- Test on real devices: mobile (320px), tablet (768px), desktop (1024px+)
- Touch-friendly button sizes (min 44x44px)
- No horizontal scroll
- Fast on 4G networks (optimize images, minimize JavaScript)

### Simplicity
- Prefer straightforward solutions over "clever" code
- One language per component (TypeScript, not mixing with JavaScript)
- Reuse components instead of duplicating
- Clear naming: component names, function names, variable names should be self-documenting

---

## Development Principles

1. **TypeScript Strict Mode**
   - All code is `// @ts-check` or `.ts` files with strict: true
   - No `any` types; use proper type definitions
   - Catch errors at compile time, not runtime

2. **Maintainability Over Cleverness**
   - Code is read far more often than written
   - Clear variable/function names beat comments
   - DRY principle: reuse components and functions
   - Three similar lines = candidate for abstraction

3. **No Over-Engineering**
   - Build only what's needed for website (no appointment scheduling, no user accounts, no admin dashboard)
   - Simple contact form → email to clinic
   - No unnecessary dependencies
   - Prefer built-in features (Next.js, React) over extra libraries

4. **Validate Inputs Everywhere**
   - Client validation: fast feedback to users
   - Server validation: required, cannot be bypassed
   - Form data schema (Zod) enforces both

5. **Secure by Default**
   - Environment variables for all secrets (API keys, email credentials)
   - Never log sensitive information
   - Server-only functions for database/email access
   - No secrets in client bundles

---

## Translation (i18n) Workflow

### Adding New Content
1. Add English text to `messages/en.json`:
   ```json
   {
     "home": {
       "appointment_cta": "Request Appointment"
     }
   }
   ```

2. Add Kannada translation to `messages/kn.json`:
   ```json
   {
     "home": {
       "appointment_cta": "ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಕೇಳಿ"
     }
   }
   ```

3. Use in component:
   ```tsx
   import { useTranslations } from 'next-intl';
   
   export default function Home() {
     const t = useTranslations();
     return <button>{t('home.appointment_cta')}</button>;
   }
   ```

### Language Switching
- URL includes language prefix: `/en/about`, `/kn/services`
- Language selector in header allows switching
- User preference persisted in browser/cookies

---

## Deployment Checklist

Before deploying to production:
- [ ] All pages tested on mobile (320px), tablet (768px), desktop (1440px)
- [ ] All text translations complete in `messages/en.json` and `messages/kn.json`
- [ ] Clinic info in `lib/constants.ts` is current (hours, phone, branches)
- [ ] Images optimized and using Next.js `Image` component
- [ ] Form submission emails verified (test flow: submit → check email)
- [ ] TypeScript build passes: `npm run build`
- [ ] No console errors or warnings in browser DevTools
- [ ] Accessibility tested: keyboard nav, screen reader, color contrast
- [ ] All links work (internal routes, external links, mailto, tel, WhatsApp)
- [ ] Hero section displays doctor photo correctly
- [ ] Both branch locations displayed with correct hours
- [ ] Contact form includes WhatsApp option with correct number
- [ ] Privacy policy or data handling disclosure included
- [ ] No hardcoded secrets in code or `.env.local` committed

---

## Git Workflow

### Commit Messages
- Clear, present-tense action: "Add home page hero section" (not "added" or "Adding")
- Describe *what* changed and *why*, not detailed implementation
- Example: "Add Kannada translations for home page" or "Fix mobile navigation layout"

### Branches
- `main` → production-ready code
- Feature branches: `feature/home-page`, `feature/contact-form`, etc.
- Create PR, get approval, merge to main

---

## Performance & SEO

### Page Speed
- Lighthouse score target: 90+
- Optimize images (WebP, responsive sizes)
- Minimize JavaScript (code splitting, lazy loading)
- Cache static pages (SSG with revalidation)

### SEO
- `<meta name="description">` on all pages (155 chars max)
- Open Graph tags for social sharing
- Structured data (`<script type="application/ld+json">`) for clinic
- Canonical URLs to avoid duplicate content
- `sitemap.xml` and `robots.txt`
- Mobile-friendly (responsive design tested)

### Monitoring
- Google Search Console setup (track indexing, search queries)
- Google Analytics (track visitor behavior, conversions)
- Error monitoring (Sentry or similar) to catch runtime errors

---

## When in Doubt

1. **Read CONSTITUTION.md first.** All decisions must align with the 14 principles.
2. **Check SPECIFICATION.md.** Clinic hours, contact info, business rules live here.
3. **Refer to ASSETS.md.** Doctor bio, branding colors, logo guidelines are documented.
4. **Prefer simplicity.** The simplest solution that meets requirements is the best.
5. **Prioritize accessibility.** Make sure users can navigate keyboard-only and with screen readers.
6. **Test on mobile.** This is a patient-facing website; mobile experience is critical.
7. **Ask for clarification.** If clinic requirements are unclear, ask before implementing.

---

## Contact & Questions

- **Project Lead:** (Dr. Ganiger or designated staff member)
- **Clinic Phones:** 9448932092, 9611739915
- **Clinic Email:** drlakki34@gmail.com
- **Doctor Specialization:** Prosthodontist & Oral Implantologist
- **Branches:** Athani (10 AM - 5 PM, daily) & Ainapur (6 PM - 8:30 PM, Mon-Sat)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-10-28 | Initial CLAUDE.md with tech stack, structure, and development guidelines |

