# Implementation Tasks Breakdown
## Dr. Ganiger's Dental Clinic Website

**Format:** Actionable tasks grouped by phase  
**Status:** Ready to Execute  
**Total Estimated Hours:** 60-80 hours (2-3 weeks at 20-30 hrs/week)

---

## Phase 1: Project Setup (Days 1-2, ~8 hours)

### Environment & Dependencies
- [ ] **TASK 1.1** — Install Node.js 18+ and verify with `node --version` and `npm --version`
- [ ] **TASK 1.2** — Create GitHub repository at https://github.com/[org]/dr-ganiger-dental
- [ ] **TASK 1.3** — Clone repo locally: `git clone [repo-url] && cd dr-ganiger-dental`
- [ ] **TASK 1.4** — Initialize Next.js with: `npx create-next-app@latest . --typescript --tailwind --app`
- [ ] **TASK 1.5** — Install additional dependencies:
  ```bash
  npm install react-hook-form zod next-intl resend isomorphic-dompurify
  npm install --save-dev vitest @playwright/test axe-core eslint prettier
  ```
- [ ] **TASK 1.6** — Verify `npm run dev` launches server at http://localhost:3000

### Configuration Files
- [ ] **TASK 1.7** — Configure TypeScript strict mode in `tsconfig.json`:
  ```json
  {
    "compilerOptions": {
      "strict": true,
      "noImplicitAny": true,
      "strictNullChecks": true
    }
  }
  ```
- [ ] **TASK 1.8** — Configure TailwindCSS colors in `tailwind.config.ts`:
  ```javascript
  colors: {
    primary: '#003D7A',    // Navy blue
    accent: '#FF9F1C',     // Orange
  }
  ```
- [ ] **TASK 1.9** — Set up next.config.ts with image optimization
- [ ] **TASK 1.10** — Configure next-intl in `lib/i18n.ts` for English/Kannada routing

### Git & CI/CD
- [ ] **TASK 1.11** — Create `.env.example`:
  ```env
  RESEND_API_KEY=your_key_here
  CLINIC_EMAIL=drlakki34@gmail.com
  CLINIC_PHONE=9448932092
  CLINIC_WHATSAPP=9448932092
  RECAPTCHA_SECRET_KEY=your_key_here
  RECAPTCHA_SITE_KEY=your_key_here
  ```
- [ ] **TASK 1.12** — Create `.env.local` (DO NOT COMMIT) with actual values
- [ ] **TASK 1.13** — Update `.gitignore` to include: `.env.local`, `node_modules/`, `.next/`, `*.log`
- [ ] **TASK 1.14** — Create GitHub Actions workflow: `.github/workflows/build.yml`
  - Run on every push: lint, type-check, test, build
- [ ] **TASK 1.15** — Create GitHub Actions workflow: `.github/workflows/deploy.yml`
  - Deploy to Vercel on push to main
- [ ] **TASK 1.16** — Create initial commit:
  ```bash
  git add .
  git commit -m "Initialize Next.js project with TypeScript, TailwindCSS, i18n"
  git push origin main
  ```

### Verification
- [ ] **TASK 1.17** — Verify all dependencies installed: `npm list`
- [ ] **TASK 1.18** — Verify dev server runs: `npm run dev` (Ctrl+C to stop)
- [ ] **TASK 1.19** — Verify build succeeds: `npm run build`
- [ ] **TASK 1.20** — Verify TypeScript strict mode: `npm run type-check` (should pass with no errors)

---

## Phase 2: Layout & Navigation (Days 3-4, ~12 hours)

### Create Components
- [ ] **TASK 2.1** — Create `components/Header.tsx`:
  - Logo/branding (SVG or text)
  - Navigation links (Home, About, Services, Contact)
  - Language selector (EN/KN)
  - Mobile hamburger menu (using Tailwind/React state)
  - Sticky/fixed positioning
  - z-index above other content

- [ ] **TASK 2.2** — Create `components/Footer.tsx`:
  - Doctor name and title
  - Clinic contact: phone, email, WhatsApp
  - Both branch info (Athani & Ainapur) with hours
  - Social media links (Instagram, Facebook, Twitter, WhatsApp)
  - Copyright notice
  - Dark background (navy blue) with white text

- [ ] **TASK 2.3** — Create `components/LanguageSelector.tsx`:
  - EN / KN toggle
  - Updates URL to `/en/*` or `/kn/*`
  - Preserves current page (navigates to same page in other language)
  - Styled as dropdown or inline buttons

### Create Layouts
- [ ] **TASK 2.4** — Update `app/layout.tsx` (root layout):
  - Import Header and Footer
  - Add global metadata (title, description, favicon, viewport)
  - Google Fonts (Inter for English, Noto Sans Kannada)
  - CSP headers (Vercel deployment)
  - HTTPS enforcement

- [ ] **TASK 2.5** — Create `app/[lang]/layout.tsx` (language-scoped layout):
  - Import next-intl `useTranslations`
  - Wrap children with language context
  - Render Header and Footer
  - Set HTML lang attribute correctly

### Create Global Styles
- [ ] **TASK 2.6** — Create `styles/globals.css`:
  - TailwindCSS @apply directives
  - Reset styles (margins, padding on common elements)
  - Custom fonts configuration
  - CSS variables for colors (--primary, --accent)
  - Smooth transitions and animations

### Create Library Files
- [ ] **TASK 2.7** — Create `lib/constants.ts`:
  ```typescript
  export const CLINIC_INFO = {
    name: "Dr. Ganiger's Multispeciality Dental Clinic & Implant Center",
    doctor: "Dr. Lakkappa S Ganiger",
    qualifications: "BDS, MDS",
    specialization: "Prosthodontist & Oral Implantologist",
    primaryPhone: "9448932092",
    secondaryPhone: "9611739915",
    email: "drlakki34@gmail.com",
    whatsapp: "9448932092",
    branches: [
      {
        name: "Athani",
        address: "Near Ambedkar Circle, Opp. Town Lake, ATHANI - 591 304",
        hours: "10:00 AM - 5:00 PM (7 days/week)",
        phone: "9448932092",
      },
      {
        name: "Ainapur",
        address: "Nehru Chowk, AINAPUR - 591 303, Tal. Kagawad",
        hours: "6:00 PM - 8:30 PM (Closed Sundays)",
        phone: "9448932092",
      },
    ],
  };
  ```

### Create Translation Files
- [ ] **TASK 2.8** — Create `messages/en.json` with English translations:
  ```json
  {
    "nav": {
      "home": "Home",
      "about": "About",
      "services": "Services",
      "contact": "Contact"
    },
    "clinic": {
      "motto": "Excellence in Every Smile",
      "name": "Dr. Ganiger's Multispeciality Dental Clinic"
    }
  }
  ```

- [ ] **TASK 2.9** — Create `messages/kn.json` with Kannada translations (same structure, Kannada text)

### Test Navigation
- [ ] **TASK 2.10** — Run `npm run dev` and verify:
  - Header displays with logo and nav
  - Language selector works (toggle EN/KN)
  - URL changes to `/en/*` or `/kn/*`
  - Footer displays on all pages
  - Mobile menu toggles on small screens
  - No console errors

- [ ] **TASK 2.11** — Test responsive layout on different screen sizes (DevTools)

### Commit
- [ ] **TASK 2.12** — Commit changes:
  ```bash
  git add .
  git commit -m "Add header, footer, and global layout components"
  git push origin main
  ```

---

## Phase 3: Core Pages (Days 5-8, ~20 hours)

### Home Page
- [ ] **TASK 3.1** — Create `app/[lang]/page.tsx`:
  - Hero section with doctor photo (right side, image-heavy)
  - Clinic motto and tagline (left side)
  - "Request Appointment" CTA button (orange, large)
  - Key specializations (grid of 3-4 items)
  - Quick clinic info (hours, location, contact)
  - Services preview (link to full services page)
  - SEO: title, description, Open Graph tags

- [ ] **TASK 3.2** — Optimize doctor photo:
  - Use Next.js Image component for lazy loading
  - Responsive sizing (full width on mobile, 50% on desktop)
  - Alt text: "Dr. Lakkappa S Ganiger"
  - Format: WebP with fallback to JPG

### About Page
- [ ] **TASK 3.3** — Create `app/[lang]/about/page.tsx`:
  - Page title: "About Dr. Ganiger"
  - Doctor photo (circular, with border)
  - Full name, qualifications (BDS, MDS)
  - Specialization: "Prosthodontist & Oral Implantologist"
  - Detailed bio (from ASSETS.md)
  - Specializations list:
    * Full Mouth Rehabilitation
    * Smile Designing
    * Crown & Bridges
    * Denture
    * Implants
    * Maxillofacial Prosthesis
  - Clinic philosophy/values
  - CTA: Link to contact form
  - SEO: title, description, Open Graph tags

### Services Page
- [ ] **TASK 3.4** — Create `app/[lang]/services/page.tsx`:
  - Page title: "Our Services/Treatments"
  - Service cards (grid layout, responsive):
    * Full Mouth Rehabilitation
    * Smile Designing / Aesthetic Dentistry
    * Crown & Bridges
    * Denture / Removable Prosthesis
    * Implants / Dental Implants
    * Maxillofacial Prosthesis
  - Each card includes:
    * Icon or image (generic dental imagery)
    * Service name
    * Brief description (2-3 sentences, factual)
    * "Learn More" or "Request Appointment" link
  - No medical claims
  - CTA buttons link to contact form
  - SEO: title, description, Open Graph tags

### Contact Page
- [ ] **TASK 3.5** — Create `app/[lang]/contact/page.tsx`:
  - Page title: "Contact Us / Request Appointment"
  - Contact form (see Phase 4)
  - Branch information (cards):
    * **Athani Branch:**
      - Address
      - Hours: 10:00 AM - 5:00 PM (7 days)
      - Phone number
      - WhatsApp link
    * **Ainapur Branch:**
      - Address
      - Hours: 6:00 PM - 8:30 PM (Closed Sundays)
      - Phone number
      - WhatsApp link
  - Google Maps embed (optional)
  - Direct contact options:
    * Call: 9448932092
    * WhatsApp: wa.me/9448932092
    * Email: drlakki34@gmail.com
  - SEO: title, description, Open Graph tags

### Privacy Policy Page
- [ ] **TASK 3.6** — Create `app/[lang]/privacy/page.tsx`:
  - Privacy Policy content:
    * What data is collected (name, phone, email only)
    * How data is used (sent to clinic email)
    * Data retention policy
    * Patient privacy commitment
    * No tracking, no cookies
    * Contact for privacy concerns

### Terms of Service Page
- [ ] **TASK 3.7** — Create `app/[lang]/terms/page.tsx`:
  - Terms of Service content:
    * Appointment request is a request, not a confirmation
    * Clinic will contact to confirm via phone
    * No medical advice provided through website
    * Website terms and conditions
    * Clinic liability limits

### 404 Page
- [ ] **TASK 3.8** — Create `app/not-found.tsx`:
  - Friendly 404 message
  - Link back to home
  - Branded with header/footer

### Metadata & SEO
- [ ] **TASK 3.9** — Add metadata to each page:
  ```typescript
  export const metadata = {
    title: "Page Title | Dr. Ganiger's Clinic",
    description: "Brief description (155 chars max)",
    openGraph: {
      title: "Page Title",
      description: "OG description",
      image: "/path/to/image.jpg",
    },
  };
  ```

- [ ] **TASK 3.10** — Create `app/sitemap.ts`:
  ```typescript
  export default function sitemap() {
    return [
      { url: "https://domain.com/en", lastmod: new Date() },
      { url: "https://domain.com/kn", lastmod: new Date() },
      // ... other pages
    ];
  }
  ```

- [ ] **TASK 3.11** — Create `app/robots.ts`:
  ```typescript
  export default function robots() {
    return {
      rules: [
        { userAgent: "*", allow: "/" },
      ],
      sitemap: "https://domain.com/sitemap.xml",
    };
  }
  ```

### Styling & Responsiveness
- [ ] **TASK 3.12** — Style pages with TailwindCSS:
  - Mobile-first approach
  - Breakpoints: sm (640px), md (768px), lg (1024px), xl (1440px)
  - Color scheme: navy blue primary, orange accents
  - Typography: responsive font sizes
  - Spacing: consistent grid (8px base)

- [ ] **TASK 3.13** — Test responsive layout:
  - DevTools at 320px (mobile)
  - DevTools at 768px (tablet)
  - DevTools at 1440px (desktop)
  - No horizontal scroll
  - Text readable without zoom

### Testing
- [ ] **TASK 3.14** — Test all pages:
  - All pages render without errors
  - Links work (navigate between pages)
  - Language switcher works
  - Mobile layout correct
  - Images load quickly (check Network tab)

### Commit
- [ ] **TASK 3.15** — Commit changes:
  ```bash
  git add .
  git commit -m "Add home, about, services, contact, privacy, terms pages"
  git push origin main
  ```

---

## Phase 4: Contact Form (Days 9-11, ~16 hours)

### Form Component
- [ ] **TASK 4.1** — Create `components/ContactForm.tsx`:
  - Use React Hook Form with Zod validation
  - Fields:
    * Name (text input, required)
    * Phone (tel input, required)
    * Email (email input, required)
    * Preferred Date (date input, optional)
    * Message (textarea, optional)
    * Consent checkbox (required)
  - Server action on submit
  - Loading state (spinner)
  - Error display
  - Success message
  - Form reset after submission

### Validation Schema
- [ ] **TASK 4.2** — Create `lib/validation.ts`:
  ```typescript
  import { z } from 'zod';
  
  export const contactFormSchema = z.object({
    name: z.string().min(2).max(100),
    phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid phone'),
    email: z.string().email(),
    preferredDate: z.string().date().optional(),
    message: z.string().max(1000).optional(),
    consent: z.boolean().refine(val => val === true),
  });
  ```

### Sanitization
- [ ] **TASK 4.3** — Create `lib/sanitize.ts`:
  ```typescript
  import DOMPurify from 'isomorphic-dompurify';
  
  export function sanitizeInput(input: string): string {
    return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
  }
  ```

### Rate Limiting
- [ ] **TASK 4.4** — Create `lib/rateLimit.ts`:
  - Map of IP → submissions (timestamps)
  - Allow 5 submissions per IP per hour
  - Clean up old submissions

### Email Utilities
- [ ] **TASK 4.5** — Create `lib/email.ts`:
  ```typescript
  import { Resend } from 'resend';
  
  export async function sendClinicEmail(data: FormData) {
    // Email to clinic
  }
  
  export async function sendPatientEmail(data: FormData) {
    // Confirmation email to patient
  }
  ```

### Server Action
- [ ] **TASK 4.6** — Create `app/api/contact/route.ts`:
  - Accept POST request with form data
  - Parse and validate using Zod
  - Sanitize all inputs
  - Check rate limit (IP-based)
  - Verify reCAPTCHA token with Google API
  - Send two emails (clinic + patient)
  - Return success/error response
  - Handle errors gracefully

### reCAPTCHA Integration
- [ ] **TASK 4.7** — Set up reCAPTCHA v3:
  - Sign up at google.com/recaptcha
  - Get API keys (public and secret)
  - Add public key to `.env.example` and `.env.local`
  - Add secret key to `.env.local` (server-only)
  - Add reCAPTCHA script to Head
  - Verify token on server before processing

### Email Templates
- [ ] **TASK 4.8** — Create clinic email template:
  - Patient name, phone, email
  - Preferred date/time
  - Message
  - Timestamp
  - WhatsApp link for clinic to confirm

- [ ] **TASK 4.9** — Create patient acknowledgement email:
  - Thank you message
  - Clinic will call within 24 hours
  - Clinic contact info
  - WhatsApp link

### Resend Integration
- [ ] **TASK 4.10** — Sign up at resend.com:
  - Get API key
  - Add to `.env.local` as `RESEND_API_KEY`
  - Configure sender email
  - Test email sending

### Form Testing
- [ ] **TASK 4.11** — Test form functionality:
  - Fill form with valid data → submits successfully
  - Show success message
  - Emails sent to clinic and patient
  - Form clears
  - Fill form with invalid phone → error message
  - Fill form with invalid email → error message
  - Leave required field blank → error message
  - Rate limiting: submit 5 times quickly → 6th blocked

### Accessibility
- [ ] **TASK 4.12** — Ensure form accessibility:
  - All inputs have labels
  - Labels associated with inputs (htmlFor)
  - Error messages linked to inputs (aria-describedby)
  - Tab order logical
  - Submit button keyboard accessible
  - Color not sole indicator of error

### Integration with Contact Page
- [ ] **TASK 4.13** — Update `app/[lang]/contact/page.tsx`:
  - Import ContactForm component
  - Display form above branch info
  - Styling consistent with page

### Commit
- [ ] **TASK 4.14** — Commit changes:
  ```bash
  git add .
  git commit -m "Add contact form with validation, sanitization, email delivery"
  git push origin main
  ```

---

## Phase 5: Testing (Days 12-13, ~12 hours)

### Unit Tests
- [ ] **TASK 5.1** — Create `__tests__/lib/validation.test.ts`:
  - Test valid form submission
  - Test invalid phone number
  - Test invalid email
  - Test missing required fields
  - Test consent checkbox

- [ ] **TASK 5.2** — Create `__tests__/lib/sanitize.test.ts`:
  - Test sanitization removes HTML tags
  - Test sanitization handles special characters
  - Test sanitization preserves safe text

- [ ] **TASK 5.3** — Create `__tests__/lib/utils.test.ts` (if applicable)

- [ ] **TASK 5.4** — Run tests: `npm run test:unit`
  - All tests pass (green)
  - No warnings or errors

### Integration Tests
- [ ] **TASK 5.5** — Create `__tests__/e2e/contact-form.spec.ts`:
  - Open contact page
  - Fill form with valid data
  - Submit form
  - Verify success message appears
  - Verify form clears

- [ ] **TASK 5.6** — Create `__tests__/e2e/home.spec.ts`:
  - Open home page
  - Verify all content loads
  - Click "Request Appointment" → navigates to contact

- [ ] **TASK 5.7** — Create `__tests__/e2e/accessibility.spec.ts`:
  - Tab through form inputs
  - Verify focus indicators
  - Verify screen reader compatibility
  - Check color contrast

- [ ] **TASK 5.8** — Run E2E tests: `npm run test:e2e`
  - All tests pass (green)
  - No flaky tests

### Accessibility Testing
- [ ] **TASK 5.9** — Test keyboard navigation:
  - Tab through all pages
  - Focus indicators visible
  - Form submittable with keyboard

- [ ] **TASK 5.10** — Test with screen reader (NVDA or VoiceOver)
  - Page structure announced correctly
  - Form labels read correctly
  - Error messages announced
  - Images have alt text

- [ ] **TASK 5.11** — Test color contrast:
  - Use Chrome DevTools Accessibility panel
  - Verify 4.5:1 for body text
  - Verify 3:1 for UI components
  - Use WebAIM Contrast Checker

- [ ] **TASK 5.12** — Run axe accessibility scan: `npm run test:a11y`
  - Zero critical issues
  - Warnings documented and justified

### Mobile Responsiveness
- [ ] **TASK 5.13** — Test on actual mobile devices:
  - iPhone SE (320px)
  - iPhone 12 (390px)
  - iPad (768px)
  - iPad Pro (1024px)
  - Desktop (1440px+)

- [ ] **TASK 5.14** — Verify:
  - No horizontal scroll
  - Text readable without zoom
  - Touch targets 44x44px minimum
  - Images scale correctly
  - Form usable on touch

### Performance Testing
- [ ] **TASK 5.15** — Run Lighthouse:
  ```bash
  npm run build
  npm start
  # Open Chrome DevTools → Lighthouse
  # Run Lighthouse on all pages
  ```
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1
  - Score 90+

- [ ] **TASK 5.16** — Check bundle size:
  ```bash
  npm run analyze  (if bundle analyzer configured)
  ```
  - Identify large dependencies
  - Optimize if needed

- [ ] **TASK 5.17** — Check Core Web Vitals in DevTools
  - LCP measured
  - FID measured
  - CLS measured

### SEO Testing
- [ ] **TASK 5.18** — Verify SEO:
  - All pages have unique titles
  - All pages have descriptions (155 chars)
  - Open Graph tags present
  - Canonical URLs correct
  - sitemap.xml generates
  - robots.txt generates

- [ ] **TASK 5.19** — Test with SEO tools:
  - Google Mobile-Friendly Test (pages should be mobile-friendly)
  - Lighthouse SEO audit (should be 90+)

### Security Testing
- [ ] **TASK 5.20** — Verify no secrets exposed:
  ```bash
  grep -r "RESEND_API_KEY" app/  # Should return nothing
  grep -r "SECRET" app/          # Should return nothing in client code
  ```

- [ ] **TASK 5.21** — Verify `.env.local` not committed:
  ```bash
  git log --full-history -p -- .env.local  # Should show "deletion"
  ```

- [ ] **TASK 5.22** — Test form security:
  - Submit form with HTML tags (e.g., `<script>alert('xss')</script>`)
  - Verify tags are stripped
  - Check email for sanitized content

- [ ] **TASK 5.23** — Test rate limiting:
  - Submit form 5 times quickly
  - 6th submission blocked with error message
  - Wait 1 hour, try again (should succeed)

### Final QA
- [ ] **TASK 5.24** — Comprehensive testing:
  - Open each page
  - Click all links
  - Fill and submit contact form
  - Verify emails sent
  - Check for console errors
  - Verify no 404s

### Commit
- [ ] **TASK 5.25** — Commit test files:
  ```bash
  git add __tests__/
  git commit -m "Add unit, integration, and E2E tests"
  git push origin main
  ```

---

## Phase 6: Deployment & Launch (Days 14-15, ~8 hours)

### Vercel Setup
- [ ] **TASK 6.1** — Sign up at vercel.com
- [ ] **TASK 6.2** — Import GitHub repository to Vercel
- [ ] **TASK 6.3** — Configure build settings:
  - Build command: `npm run build`
  - Output directory: `.next`
  - Install command: `npm ci`

- [ ] **TASK 6.4** — Add environment variables to Vercel dashboard:
  - `RESEND_API_KEY` (secret)
  - `CLINIC_EMAIL`
  - `CLINIC_PHONE`
  - `CLINIC_WHATSAPP`
  - `RECAPTCHA_SECRET_KEY` (secret)
  - `RECAPTCHA_SITE_KEY`

### Staging Deployment
- [ ] **TASK 6.5** — Deploy to staging:
  - Push to `staging` branch (or create preview deployment)
  - Vercel auto-deploys
  - Verify build succeeds
  - Verify staging URL accessible

- [ ] **TASK 6.6** — Test on staging:
  - All pages render
  - Contact form works
  - Emails deliver
  - No console errors
  - Performance acceptable

### Production Deployment
- [ ] **TASK 6.7** — Final checks before production:
  - All tests pass: `npm run test:unit && npm run test:e2e`
  - Build succeeds: `npm run build`
  - TypeScript strict: `npm run type-check`
  - No ESLint errors: `npm run lint`

- [ ] **TASK 6.8** — Create production build locally:
  ```bash
  npm run build
  npm start
  # Test at http://localhost:3000
  ```

- [ ] **TASK 6.9** — Deploy to production:
  - Merge to `main` branch
  - GitHub Actions triggers CI/CD
  - Vercel builds and deploys
  - Monitor Vercel deployment logs

- [ ] **TASK 6.10** — Verify production deployment:
  - Website loads at production domain
  - All pages accessible
  - Contact form works
  - Emails deliver
  - No 5xx errors
  - Core Web Vitals green

### Domain & DNS
- [ ] **TASK 6.11** — Configure domain:
  - Purchase domain (if needed)
  - Add domain to Vercel project
  - Update DNS records (Vercel provides instructions)
  - SSL certificate auto-provisioned

- [ ] **TASK 6.12** — Verify HTTPS:
  - Website accessible at https://domain.com
  - Redirect http → https works
  - SSL certificate valid

### Post-Deployment
- [ ] **TASK 6.13** — Set up monitoring:
  - Enable Vercel Analytics
  - Monitor Core Web Vitals
  - Set up error alerts (optional)

- [ ] **TASK 6.14** — Submit to Google Search Console:
  - Verify domain ownership
  - Submit sitemap.xml
  - Request indexing of pages
  - Monitor crawl errors

- [ ] **TASK 6.15** — Set up Google Analytics:
  - Create GA4 property
  - Add tracking code to website
  - Verify data collection

- [ ] **TASK 6.16** — Test production form:
  - Submit test appointment
  - Verify clinic receives email
  - Verify patient receives acknowledgement
  - Verify no spam (check email filters)

### Launch Announcement
- [ ] **TASK 6.17** — Prepare launch materials:
  - Website live announcement
  - Social media posts (Instagram, Facebook, WhatsApp)
  - Email to existing patients (optional)

- [ ] **TASK 6.18** — Notify clinic staff:
  - Website is live
  - Form submissions arriving in email
  - Provide instructions for confirming appointments via WhatsApp

### Final Sign-Off
- [ ] **TASK 6.19** — Checklist completion:
  - All items in CHECKLIST.md completed
  - No known bugs or issues
  - Performance targets met
  - Accessibility verified

- [ ] **TASK 6.20** — Documentation:
  - README.md complete
  - Setup instructions documented
  - Deployment process documented
  - Troubleshooting guide created

---

## Phase 7: Post-Launch Monitoring (Ongoing, ~4 hours/week)

### Weekly Tasks
- [ ] **TASK 7.1** — Monitor form submissions:
  - Check email inbox for appointment requests
  - Verify clinic staff confirming appointments
  - Look for spam or invalid submissions

- [ ] **TASK 7.2** — Monitor analytics:
  - Check Google Analytics for visitor trends
  - Identify popular pages
  - Track form submission rate

- [ ] **TASK 7.3** — Monitor performance:
  - Check Vercel Analytics for Core Web Vitals
  - Verify no degradation
  - Investigate any spikes in error rate

- [ ] **TASK 7.4** — Review errors:
  - Check Vercel error logs
  - Investigate any 5xx errors
  - Check form submission failures

### Monthly Tasks
- [ ] **TASK 7.5** — Update content:
  - Verify clinic info is current
  - Update hours or special closures as needed
  - Review translations for accuracy

- [ ] **TASK 7.6** — Plan improvements:
  - Gather feedback from clinic staff
  - Identify features or pages to add
  - Plan next phase (blog, gallery, etc.)

### As-Needed
- [ ] **TASK 7.7** — Bug fixes:
  - Respond to reported issues
  - Fix any problems discovered
  - Deploy updates

- [ ] **TASK 7.8** — Content updates:
  - Add testimonials (if provided)
  - Add new services
  - Update doctor bio or specializations

---

## Summary

**Total Tasks:** 93  
**Estimated Hours:** 60-80 (2-3 weeks at 20-30 hrs/week)  
**Timeline:**
- Phase 1: Days 1-2
- Phase 2: Days 3-4
- Phase 3: Days 5-8
- Phase 4: Days 9-11
- Phase 5: Days 12-13
- Phase 6: Days 14-15
- Phase 7: Ongoing

**Next Step:** Begin Phase 1 tasks in order.

