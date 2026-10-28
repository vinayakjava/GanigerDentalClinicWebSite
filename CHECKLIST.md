# Pre-Launch Verification Checklist
## Dr. Ganiger's Dental Clinic Website

**Purpose:** Verify all technical, functional, security, and accessibility requirements are met before production deployment.

**Timeline:** Complete during Phase 5 (Testing) and Phase 6 (Deployment)

---

## Phase Completion Checklist

### Phase 1: Project Setup ✓
- [ ] Node.js 18+ installed and verified
- [ ] GitHub repository created and cloned locally
- [ ] Next.js 14 initialized with TypeScript strict mode
- [ ] TailwindCSS configured with clinic colors (navy blue, orange)
- [ ] next-intl setup for English/Kannada
- [ ] All core dependencies installed (React Hook Form, Zod, Resend, etc.)
- [ ] `npm run dev` launches dev server successfully
- [ ] `.env.example` created with all required variables
- [ ] `.env.local` created locally (NOT committed)
- [ ] `.gitignore` includes `.env.local`, `node_modules/`, `.next/`
- [ ] GitHub Actions workflows configured (build.yml, deploy.yml)
- [ ] TypeScript strict mode enabled (`tsconfig.json`)

### Phase 2: Layout & Navigation ✓
- [ ] Header component created with:
  - [ ] Clinic logo (SVG, responsive sizing)
  - [ ] Navigation menu (Home, About, Services, Contact)
  - [ ] Language selector (EN/KN)
  - [ ] Mobile hamburger menu
- [ ] Footer component created with:
  - [ ] Clinic contact info (phone, email, WhatsApp)
  - [ ] Both branch addresses and hours
  - [ ] Social media links (Instagram, Facebook, Twitter, WhatsApp)
  - [ ] Copyright notice
- [ ] Root layout (`app/layout.tsx`) includes:
  - [ ] Metadata (title, description, Open Graph, favicon)
  - [ ] Google Fonts for Kannada support (Noto Sans Kannada)
  - [ ] Global styles and CSS variables
  - [ ] Header and Footer on all pages
- [ ] Language-scoped layout (`app/[lang]/layout.tsx`) works:
  - [ ] Language context available to all pages
  - [ ] Correct lang attribute in HTML
  - [ ] URL routing works (`/en/page`, `/kn/page`)
- [ ] Styling verified:
  - [ ] Navy blue (#003D7A) and orange (#FF9F1C) applied correctly
  - [ ] Typography readable (line-height 1.6+)
  - [ ] Spacing consistent (8px grid)
  - [ ] Dark mode support (if applicable)
- [ ] Navigation works:
  - [ ] All links functional
  - [ ] Active link highlighting works
  - [ ] Mobile menu toggles correctly
  - [ ] Language switcher updates URL and content

### Phase 3: Core Pages ✓
- [ ] Home page (`app/[lang]/page.tsx`):
  - [ ] Hero section displays doctor photo
  - [ ] Clinic motto visible ("Excellence in Every Smile")
  - [ ] Key specializations listed
  - [ ] "Request Appointment" CTA button prominent
  - [ ] Quick clinic info (hours, location, contact)
  - [ ] Services preview with links
  - [ ] Mobile-responsive layout
  
- [ ] About page (`app/[lang]/about/page.tsx`):
  - [ ] Doctor photo displayed
  - [ ] Full name: "Dr. Lakkappa S Ganiger"
  - [ ] Qualifications: "BDS, MDS"
  - [ ] Specialization: "Prosthodontist & Oral Implantologist"
  - [ ] Detailed bio accurate (per ASSETS.md)
  - [ ] Specializations listed (Full Mouth Rehab, Implants, Smile Design, Denture, Maxillofacial Prosthesis)
  - [ ] No medical claims or invented qualifications
  - [ ] Link to contact form
  
- [ ] Services page (`app/[lang]/services/page.tsx`):
  - [ ] All services from doctor's bio listed
  - [ ] Service descriptions factual and accurate
  - [ ] No medical claims ("guaranteed", "whitens in X weeks", etc.)
  - [ ] Each service has a CTA linking to contact form
  - [ ] Services organized logically (grid, cards)
  - [ ] Icons or visual elements enhance readability
  
- [ ] Contact page (`app/[lang]/contact/page.tsx`):
  - [ ] Contact form displays (see Form Checklist below)
  - [ ] Both branch locations shown:
    - [ ] Athani: Near Ambedkar Circle, Opp. Town Lake, ATHANI - 591 304
    - [ ] Ainapur: Nehru Chowk, AINAPUR - 591 303, Tal. Kagawad
  - [ ] Operating hours displayed correctly:
    - [ ] Athani: 10:00 AM - 5:00 PM (7 days/week)
    - [ ] Ainapur: 6:00 PM - 8:30 PM (Closed Sundays)
  - [ ] Contact information:
    - [ ] Phone: 9448932092, 9611739915
    - [ ] Email: drlakki34@gmail.com
    - [ ] WhatsApp link to 9448932092
  - [ ] Google Maps integration (optional, but helpful)
  - [ ] Mobile map view works
  
- [ ] Privacy Policy page (`app/[lang]/privacy/page.tsx`):
  - [ ] Explains what data is collected (name, phone, email)
  - [ ] Explains how data is used (sent to clinic email only)
  - [ ] States no tracking cookies used
  - [ ] Data retention policy clear
  - [ ] Patient privacy respected and emphasized
  
- [ ] Terms of Service page (`app/[lang]/terms/page.tsx`):
  - [ ] Website terms documented
  - [ ] Appointment request disclaimer ("This is a request, not a confirmation")
  - [ ] No medical advice claims
  - [ ] Clinic liability limits if applicable
  
- [ ] 404 Page:
  - [ ] Friendly error message
  - [ ] Link back to home
  - [ ] Branded with header/footer

- [ ] All pages have:
  - [ ] Correct page title (meta tag)
  - [ ] Descriptive meta description (155 chars)
  - [ ] Open Graph tags (og:title, og:description, og:image)
  - [ ] Canonical URL
  - [ ] Semantic HTML (`<main>`, `<article>`, `<nav>`, etc.)

### Phase 4: Contact Form ✓
- [ ] Form layout and fields:
  - [ ] Name field (text input, required, visible label)
  - [ ] Phone field (tel input, required, visible label)
  - [ ] Email field (email input, required, visible label)
  - [ ] Preferred Date field (date input, optional)
  - [ ] Message field (textarea, optional)
  - [ ] Consent checkbox ("I understand this is a request, not a confirmation")
  - [ ] reCAPTCHA v3 badge (invisible)
  - [ ] Submit button (disabled while submitting)
  - [ ] Cancel/Reset button (if applicable)

- [ ] Client-side validation (React Hook Form):
  - [ ] Name: 2-100 characters
  - [ ] Phone: 10 digits, starts with 6-9 (Indian mobile format)
  - [ ] Email: valid email format
  - [ ] Date: valid future date (if provided)
  - [ ] Message: max 1000 characters
  - [ ] Consent: must be checked
  - [ ] Error messages display below fields (red, clear text)
  - [ ] Validation runs on blur and submit

- [ ] Server-side validation (app/api/contact/route.ts):
  - [ ] All fields re-validated using Zod schema
  - [ ] Input sanitized (DOMPurify removes any HTML/scripts)
  - [ ] reCAPTCHA token verified with Google
  - [ ] Rate limiting enforced (max 5 per IP per hour)
  - [ ] Response includes success/error with message

- [ ] Email delivery:
  - [ ] Resend API key configured in `.env.local`
  - [ ] Two emails sent on form submission:
    1. **Clinic email** (to: drlakki34@gmail.com)
       - [ ] Includes patient name, phone, email, date preference, message
       - [ ] Includes timestamp
       - [ ] Has WhatsApp link for clinic to confirm appointment
       - [ ] Clear subject line
    2. **Patient email** (to: patient's email)
       - [ ] Confirmation received ("We will contact you within 24 hours")
       - [ ] Includes clinic contact info
       - [ ] Professional tone and formatting
       - [ ] Includes WhatsApp link to contact clinic
  - [ ] Emails arrive within 30 seconds of form submission
  - [ ] Email headers are correct (From, Reply-To, Subject)
  - [ ] Email encoding handles special characters (names, addresses)

- [ ] Form UX:
  - [ ] Successful submission shows confirmation message
  - [ ] Confirmation message displays for 3+ seconds, then clears
  - [ ] Form clears after successful submission
  - [ ] Error messages don't clear form data (UX preservation)
  - [ ] Loading state shows spinner while submitting
  - [ ] Disabled state on submit button while request in progress
  - [ ] No error if user refreshes page after submission (idempotent)

- [ ] Form accessibility:
  - [ ] All inputs have associated labels (`<label htmlFor="...">`)
  - [ ] Tab order is logical (top to bottom)
  - [ ] Submit button reachable via keyboard
  - [ ] Error messages associated with inputs (aria-describedby)
  - [ ] Form submittable with Enter key
  - [ ] Placeholder text NOT substituted for labels
  - [ ] Color not sole indicator of error (use icons + text)

### Phase 5: Testing ✓
- [ ] Unit Tests (Vitest):
  - [ ] Form validation tests pass (`validation.test.ts`)
  - [ ] Input sanitization tests pass (`sanitize.test.ts`)
  - [ ] Helper function tests pass (`utils.test.ts`)
  - [ ] Coverage: All validation logic covered
  - [ ] All tests green: `npm run test:unit`

- [ ] Integration Tests:
  - [ ] Contact form submission tested (happy path)
  - [ ] Form validation errors tested
  - [ ] Rate limiting tested (5th submission blocked)
  - [ ] Email sending tested (mock or test account)
  - [ ] Error handling tested (graceful failures)

- [ ] E2E Tests (Playwright):
  - [ ] Home page loads and renders (`test:e2e`)
  - [ ] Navigation between pages works
  - [ ] Language switcher changes content
  - [ ] Contact form can be filled out
  - [ ] Form submission succeeds and shows confirmation
  - [ ] Form submission fails gracefully with error message
  - [ ] All tests green: `npm run test:e2e`

- [ ] Accessibility Tests:
  - [ ] Keyboard navigation works on all pages (Tab, Enter, Escape)
  - [ ] Screen reader announces content correctly (VoiceOver, NVDA, JAWS)
  - [ ] Color contrast ratios meet WCAG AA:
    - [ ] Body text: 4.5:1 (normal) or 3:1 (large 18pt+)
    - [ ] UI components: 3:1
  - [ ] All images have alt text
  - [ ] Form labels properly associated with inputs
  - [ ] Focus indicators visible on all interactive elements
  - [ ] No functionality requires mouse-only interaction
  - [ ] Page structure logical (`<h1>` → `<h2>` → `<h3>`)
  - [ ] ARIA labels used only when semantic HTML insufficient
  - [ ] Tests pass: `npm run test:a11y`

- [ ] Mobile Responsiveness:
  - [ ] Tested at 320px (iPhone SE)
  - [ ] Tested at 480px (iPhone X)
  - [ ] Tested at 768px (iPad)
  - [ ] Tested at 1024px (iPad Pro)
  - [ ] Tested at 1440px (desktop)
  - [ ] No horizontal scroll at any breakpoint
  - [ ] Touch targets at least 44x44px
  - [ ] Text readable without zooming
  - [ ] Images scale appropriately
  - [ ] Forms usable on touch (no hover-only interactions)

- [ ] Performance (Lighthouse):
  - [ ] LCP (Largest Contentful Paint): < 2.5s
  - [ ] FID (First Input Delay): < 100ms
  - [ ] CLS (Cumulative Layout Shift): < 0.1
  - [ ] Lighthouse score: 90+
  - [ ] Bundle size acceptable (check with `npm run analyze`)
  - [ ] Images optimized (using Next.js Image component)
  - [ ] No render-blocking resources
  - [ ] CSS critical path optimized

- [ ] SEO:
  - [ ] All pages have unique titles and descriptions
  - [ ] Keywords present in content and meta tags
  - [ ] Open Graph tags correct (og:title, og:description, og:image)
  - [ ] Canonical URLs prevent duplicate indexing
  - [ ] Sitemap generated (app/sitemap.ts)
  - [ ] robots.txt configured (app/robots.ts)
  - [ ] Structured data (JSON-LD) for clinic
  - [ ] Mobile-friendly (responsive design verified)

- [ ] Security Testing:
  - [ ] No secrets in code (grep for API keys)
  - [ ] `.env.local` not committed to git
  - [ ] All environment variables used server-side only
  - [ ] No SQL injection (no database, but validate this assumption)
  - [ ] No XSS vulnerabilities (DOMPurify tested)
  - [ ] CSRF not applicable (no state-changing GETs)
  - [ ] HTTPS enforced (Vercel auto-config)
  - [ ] CSP headers configured
  - [ ] reCAPTCHA v3 working

### Phase 6: Deployment ✓
- [ ] Vercel Project Setup:
  - [ ] GitHub repository connected to Vercel
  - [ ] Build command: `npm run build`
  - [ ] Start command: `npm start`
  - [ ] Root directory: `.` (or appropriate if monorepo)
  - [ ] Environment variables added to Vercel dashboard:
    - [ ] `RESEND_API_KEY` (secret)
    - [ ] `CLINIC_EMAIL`
    - [ ] `CLINIC_PHONE`
    - [ ] `CLINIC_WHATSAPP`
    - [ ] `RECAPTCHA_SECRET_KEY` (secret)
    - [ ] `RECAPTCHA_SITE_KEY`

- [ ] Staging Deployment:
  - [ ] Deployment to staging environment succeeds
  - [ ] Build logs show no errors or critical warnings
  - [ ] Staging URL accessible
  - [ ] All pages render on staging
  - [ ] Contact form submits on staging
  - [ ] Emails deliver to clinic email on staging
  - [ ] No console errors in browser DevTools
  - [ ] TypeScript build passes: `npm run type-check`
  - [ ] ESLint passes: `npm run lint`

- [ ] Production Deployment:
  - [ ] All tests pass locally: `npm run test:unit && npm run test:e2e`
  - [ ] Production build succeeds: `npm run build`
  - [ ] No unresolved TypeScript issues
  - [ ] No ESLint warnings/errors
  - [ ] Domain configured (DNS records, SSL certificate)
  - [ ] Vercel domain alias added to production
  - [ ] Git commit tagged as release: `git tag v1.0.0`
  - [ ] Production deployment triggered (manual or auto from main)
  - [ ] Deployment shows green status on Vercel dashboard

- [ ] Post-Deployment Verification:
  - [ ] Website loads on production domain
  - [ ] All pages accessible and render correctly
  - [ ] Contact form works end-to-end
  - [ ] Emails deliver (test submission to clinic)
  - [ ] Patient receives acknowledgement email
  - [ ] Clinic receives full appointment details
  - [ ] No 5xx errors in Vercel logs
  - [ ] Core Web Vitals green (check Vercel Analytics)
  - [ ] Google Search Console can crawl (submit sitemap.xml)
  - [ ] Google Analytics tracking works (verify with test event)

---

## Content Verification Checklist

- [ ] All doctor information accurate:
  - [ ] Name: Dr. Lakkappa S Ganiger
  - [ ] Qualifications: BDS, MDS
  - [ ] Specialization: Prosthodontist & Oral Implantologist
  - [ ] Photo displays correctly (high quality, professional)

- [ ] All clinic information accurate:
  - [ ] Clinic name: Dr. Ganiger's Multispeciality Dental Clinic & Implant Center
  - [ ] Branch 1 (Athani):
    - [ ] Address: Near Ambedkar Circle, Opp. Town Lake, ATHANI - 591 304, Dist. Belagavi
    - [ ] Hours: 10:00 AM - 5:00 PM (7 days/week)
    - [ ] Phone: 9448932092
  - [ ] Branch 2 (Ainapur):
    - [ ] Address: Nehru Chowk, AINAPUR - 591 303, Tal. Kagawad, Dist. Belagavi
    - [ ] Hours: 6:00 PM - 8:30 PM (Closed Sundays)
    - [ ] Phone: 9448932092
  - [ ] Primary contact: 9448932092
  - [ ] Secondary contact: 9611739915
  - [ ] Email: drlakki34@gmail.com
  - [ ] WhatsApp: 9448932092

- [ ] All services/specializations listed:
  - [ ] Full Mouth Rehabilitation
  - [ ] Smile Designing
  - [ ] Crown & Bridges
  - [ ] Denture
  - [ ] Implants
  - [ ] Maxillofacial Prosthesis

- [ ] No invented or unverified content:
  - [ ] No medical claims ("successful implants", "whitens teeth in X weeks")
  - [ ] No testimonials (unless provided by patients)
  - [ ] No success rates or statistics
  - [ ] Only information provided by clinic is published
  - [ ] All content reviewed and approved by Dr. Ganiger or staff

- [ ] Translations verified:
  - [ ] English content complete and accurate
  - [ ] Kannada translations complete and accurate
  - [ ] No untranslated strings
  - [ ] Kannada fonts render correctly
  - [ ] Language switching works correctly

- [ ] Images and assets:
  - [ ] Clinic logo displays correctly (all sizes)
  - [ ] Doctor photo high quality and professional
  - [ ] All images optimized (WEBP, responsive sizes)
  - [ ] All images have alt text
  - [ ] Favicon displays in browser tab

---

## Legal & Compliance Checklist

- [ ] Privacy Policy includes:
  - [ ] What data is collected (name, phone, email)
  - [ ] How data is used (sent to clinic email)
  - [ ] Data retention policy
  - [ ] Patient privacy commitment
  - [ ] No tracking/cookies statement

- [ ] Terms of Service includes:
  - [ ] Appointment request disclaimer
  - [ ] "This is a request, not a confirmation" statement
  - [ ] No medical advice claims
  - [ ] Website terms and conditions
  - [ ] Clinic liability limits (if applicable)

- [ ] No medical claims:
  - [ ] No "guaranteed" language
  - [ ] No success rates
  - [ ] No "treatment of" specific diseases
  - [ ] Only factual specialization information

- [ ] Patient data protection:
  - [ ] Form data sent to clinic email only
  - [ ] No marketing emails without consent
  - [ ] No data sold or shared
  - [ ] GDPR/data protection considered (if applicable)

---

## Sign-Off

**Prepared by:** Claude Code  
**Date:** 2026-10-28  
**Status:** Ready for Review

**Approved by:** _____________________ (Dr. Ganiger or designated staff)  
**Approval Date:** _____________________

**Notes / Issues Found:**
```
(Document any issues discovered during checklist)
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-10-28 | Initial pre-launch checklist |

