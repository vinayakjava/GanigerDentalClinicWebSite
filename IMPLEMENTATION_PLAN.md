# Technical Implementation Plan
## Dr. Ganiger's Dental Clinic Website

**Approach:** Option A - Simple Website (No Web App)  
**Status:** Ready for Implementation  
**Estimated Timeline:** 2-3 weeks  
**Last Updated:** 2026-10-28

---

## Overview

This is a **static informational website** for a dental clinic with a simple **contact/appointment request form** that emails the clinic directly. No database, no user authentication, no admin dashboard.

**Core Philosophy:** Fast, simple, maintainable, secure by default.

---

## Tech Stack (Confirmed)

| Component | Technology | Why |
|-----------|-----------|-----|
| **Framework** | Next.js 14+ (App Router) | SSG for static pages, TypeScript, SEO, image optimization |
| **Language** | TypeScript (strict mode) | Type safety, catch errors at compile time |
| **Styling** | TailwindCSS + PostCSS | Utility-first, accessible, maintainable |
| **Internationalization** | next-intl | English/Kannada bilingual support |
| **Form Handling** | React Hook Form | Client validation, server actions |
| **Email** | Resend | Simple, transactional email delivery |
| **Deployment** | Vercel | Next.js native, automatic HTTPS, edge functions |
| **Version Control** | Git + GitHub | Standard workflow, rollback capability |
| **Testing** | Vitest + Playwright | Unit, integration, E2E tests |

---

## Directory Structure

```
dr-ganiger-dental/
├── CONSTITUTION.md                # Engineering principles
├── SPECIFICATION.md               # Business rules
├── ASSETS.md                      # Branding and assets
├── CLAUDE.md                      # Developer guide
├── IMPLEMENTATION_PLAN.md         # This file
├── .env.example                   # Environment variables template
├── .env.local                     # Local secrets (git ignored)
├── .gitignore                     # Git ignore rules
│
├── app/                           # Next.js App Router
│   ├── layout.tsx                 # Root layout (header, footer, fonts)
│   ├── page.tsx                   # Home page (redirect to [lang])
│   ├── favicon.ico                # Clinic logo icon
│   ├── sitemap.ts                 # Sitemap for SEO
│   ├── robots.ts                  # robots.txt for search engines
│   │
│   ├── [lang]/                    # Language-specific routes
│   │   ├── layout.tsx             # Language-scoped layout
│   │   ├── page.tsx               # Home page (hero + clinic info)
│   │   ├── about/
│   │   │   └── page.tsx           # About doctor and clinic
│   │   ├── services/
│   │   │   └── page.tsx           # Treatment services and specializations
│   │   ├── contact/
│   │   │   └── page.tsx           # Contact form + info
│   │   ├── privacy/
│   │   │   └── page.tsx           # Privacy policy
│   │   └── terms/
│   │       └── page.tsx           # Terms of service (if needed)
│   │
│   ├── api/
│   │   └── contact/
│   │       └── route.ts           # Server action for form submission
│   │
│   └── not-found.tsx              # 404 page
│
├── components/                    # Reusable React components
│   ├── Header.tsx                 # Navigation + logo + language selector
│   ├── Footer.tsx                 # Footer with contact info + branches
│   ├── Hero.tsx                   # Home hero with doctor photo
│   ├── DoctorCard.tsx             # Doctor profile card
│   ├── BranchCard.tsx             # Branch location card
│   ├── ServiceCard.tsx            # Service/treatment card
│   ├── ContactForm.tsx            # Appointment request form
│   ├── LanguageSelector.tsx       # Language switcher (EN/KN)
│   └── Loadingstate.tsx           # Loading spinner
│
├── lib/                           # Utility functions and helpers
│   ├── constants.ts               # Clinic info, hours, contact
│   ├── validation.ts              # Form validation schemas (Zod)
│   ├── email.ts                   # Email sending utilities
│   ├── sanitize.ts                # Input sanitization (prevent XSS)
│   └── utils.ts                   # Helper functions (dates, strings, etc.)
│
├── public/                        # Static assets
│   ├── logo.svg                   # Clinic logo
│   ├── favicon.ico                # Clinic icon
│   └── images/
│       ├── doctor.jpg             # Dr. Ganiger profile photo
│       ├── clinic-athani.jpg      # Athani branch (if available)
│       ├── clinic-ainapur.jpg     # Ainapur branch (if available)
│       └── placeholder.svg        # Placeholder for missing images
│
├── messages/                      # Translation files
│   ├── en.json                    # English translations
│   └── kn.json                    # Kannada translations
│
├── styles/                        # Global styles
│   └── globals.css                # TailwindCSS directives
│
├── __tests__/                     # Test files (mirror app structure)
│   ├── lib/
│   │   ├── validation.test.ts     # Form validation tests
│   │   └── sanitize.test.ts       # Input sanitization tests
│   ├── components/
│   │   └── ContactForm.test.tsx   # Form component tests
│   └── e2e/
│       ├── home.spec.ts           # Home page flow
│       ├── contact-form.spec.ts   # Contact form submission
│       └── accessibility.spec.ts  # Accessibility checks
│
├── next.config.ts                 # Next.js configuration
├── tailwind.config.ts             # TailwindCSS theme + colors
├── tsconfig.json                  # TypeScript strict mode
├── vitest.config.ts               # Vitest configuration
├── playwright.config.ts           # Playwright E2E configuration
├── package.json                   # Dependencies
├── package-lock.json              # Locked versions
└── .github/
    └── workflows/
        ├── build.yml              # CI: TypeScript check, build, tests
        └── deploy.yml             # CD: Deploy to Vercel on push to main
```

---

## Core Pages & Components

### Pages to Build

#### 1. **Home Page** (`app/[lang]/page.tsx`)
- Hero section with doctor photo
- Clinic motto ("Excellence in Every Smile")
- Key specializations (Full Mouth Rehab, Implants, Smile Design, etc.)
- "Request Appointment" CTA button
- Quick clinic info (hours, contact)
- Link to services and about pages

#### 2. **About Page** (`app/[lang]/about/page.tsx`)
- Doctor photo + bio
- Qualifications (BDS, MDS, Prosthodontist & Oral Implantologist)
- Specializations and treatments
- Clinic philosophy
- Link to contact form

#### 3. **Services Page** (`app/[lang]/services/page.tsx`)
- List of treatments (Full Mouth Rehabilitation, Implants, Crowns & Bridges, etc.)
- Service cards with descriptions
- No medical claims; factual information only
- Link to contact form for each service

#### 4. **Contact Page** (`app/[lang]/contact/page.tsx`)
- Contact form (name, phone, email, date preference, message)
- Branch locations with addresses, hours, maps
- Phone numbers and WhatsApp links
- Email address
- Form submission confirmation message

#### 5. **Privacy Policy** (`app/[lang]/privacy/page.tsx`)
- What data is collected (name, phone, email)
- How data is used (sent to clinic email only)
- No tracking; no cookies
- Data retention policy

#### 6. **Terms of Service** (`app/[lang]/terms/page.tsx`)
- Website terms
- No medical advice claims
- Appointment request disclaimer

---

## Contact Form Design

### Form Fields
```
Name *            (text input, required)
Phone *           (tel input, required, validated as Indian mobile)
Email *           (email input, required)
Preferred Date    (date input, optional)
Message           (textarea, optional)
Consent *         (checkbox: "I understand this is a request, not a confirmation")
reCAPTCHA v3      (invisible spam protection)
```

### Form Flow
1. **Client-side validation** (React Hook Form)
   - Name: non-empty, 2-100 chars
   - Phone: valid Indian mobile format (10 digits)
   - Email: valid email format
   - Consent: must be checked

2. **Submit to server action** (`app/api/contact/route.ts`)
   - Validate again on server (never trust client)
   - Sanitize all inputs (prevent XSS)
   - Verify reCAPTCHA token
   - Send email to clinic
   - Return success/error response

3. **Success response**
   - Confirmation message: "Thank you! Clinic will contact you soon"
   - Patient receives acknowledgement email
   - Clinic receives appointment request email with all details

4. **Error handling**
   - Clear error messages for validation failures
   - Rate limiting (max 5 submissions per IP per hour)
   - Graceful fallback if email service fails

---

## Email Delivery

### Email Configuration

**Provider:** Resend (simple, free tier sufficient)
- Sign up at resend.com
- Add domain (or use default resend.dev domain)
- Get API key → store in `.env.local` as `RESEND_API_KEY`

### Emails Sent

#### 1. **Clinic Notification Email** (to: `CLINIC_EMAIL`)
```
Subject: New Appointment Request - [Patient Name]

From: [Patient Name]
Phone: [Phone Number]
Email: [Email Address]

Preferred Date: [Date, or "No preference"]
Message: [Optional message]

---
Received at: [Timestamp]
IP Address: [Masked for privacy]

Reply to patient at: [Phone] or [Email]
Confirm appointment via WhatsApp: wa.me/[CLINIC_WHATSAPP]?text=Hi [Name], your appointment is confirmed...
```

#### 2. **Patient Acknowledgement Email** (to: patient email)
```
Subject: We received your appointment request

Dear [Patient Name],

Thank you for requesting an appointment at Dr. Ganiger's Clinic!

We have received your request and will contact you within 24 hours to confirm 
your appointment.

Clinic Contact:
Phone: [CLINIC_PHONE]
WhatsApp: [CLINIC_WHATSAPP]

If you prefer to contact us directly:
- WhatsApp: wa.me/[CLINIC_WHATSAPP]
- Call: [CLINIC_PHONE]

Best regards,
Dr. Ganiger's Clinic Team
```

### Email Sending Code
```typescript
// lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendClinicNotification(data: ContactFormData) {
  try {
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.CLINIC_EMAIL,
      subject: `New Appointment Request - ${data.name}`,
      html: renderClinicEmail(data),
    });
    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error('Failed to send clinic email:', error);
    return { success: false, error: error.message };
  }
}

export async function sendPatientAcknowledgement(data: ContactFormData) {
  try {
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: data.email,
      subject: 'We received your appointment request',
      html: renderPatientEmail(data),
    });
    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error('Failed to send patient email:', error);
    return { success: false, error: error.message };
  }
}
```

---

## Security Design

### Input Validation & Sanitization

**Never trust the browser.** All inputs validated and sanitized on server.

```typescript
// lib/validation.ts
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number'),
  email: z.string().email(),
  preferredDate: z.string().date().optional(),
  message: z.string().max(1000).optional(),
  consent: z.boolean().refine(val => val === true, 'Must accept consent'),
});

// lib/sanitize.ts
import DOMPurify from 'isomorphic-dompurify';

export function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
}
```

### Rate Limiting

Prevent spam and abuse:
```typescript
// lib/rateLimit.ts
const submissions = new Map<string, number[]>();

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userSubmissions = submissions.get(ip) || [];
  
  // Keep only submissions from last hour
  const recentSubmissions = userSubmissions.filter(
    ts => now - ts < 3600000
  );
  
  if (recentSubmissions.length >= 5) {
    return false; // Too many submissions
  }
  
  recentSubmissions.push(now);
  submissions.set(ip, recentSubmissions);
  return true;
}
```

### Environment Variables (Server-Only)

All secrets stored in `.env.local` (never committed):
```env
# .env.local (DO NOT COMMIT)
RESEND_API_KEY=re_xxxxxxxxxxxxx
CLINIC_EMAIL=drlakki34@gmail.com
CLINIC_PHONE=9448932092
CLINIC_WHATSAPP=9448932092
RECAPTCHA_SECRET_KEY=xxxxxxxxxxxxx
RECAPTCHA_SITE_KEY=xxxxxxxxxxxxx (public, OK to expose)
```

These are accessed only in server actions and API routes, never sent to browser.

### CORS & CSP

- No API endpoints exposed to cross-origin requests
- Content Security Policy (CSP) headers enforce:
  - Only HTTPS connections
  - No inline scripts
  - Only trusted domains (Resend, reCAPTCHA, Vercel analytics)

### No SQL Injection, XSS, CSRF
- No database (no SQL)
- DOMPurify sanitizes all user inputs
- CSRF not applicable (no state-changing GETs, no cookies)

---

## Testing Strategy

### Unit Tests (Vitest)
Test pure functions: validation, sanitization, helpers.

```bash
# Run unit tests
npm run test:unit

# Watch mode
npm run test:watch
```

**Example:** `__tests__/lib/validation.test.ts`
```typescript
import { describe, it, expect } from 'vitest';
import { contactFormSchema } from '@/lib/validation';

describe('contactFormSchema', () => {
  it('validates a correct form submission', () => {
    const valid = {
      name: 'John Doe',
      phone: '9876543210',
      email: 'john@example.com',
      consent: true,
    };
    expect(() => contactFormSchema.parse(valid)).not.toThrow();
  });

  it('rejects invalid phone numbers', () => {
    const invalid = { phone: '1234567890' }; // Not 6-9
    expect(() => contactFormSchema.parse(invalid)).toThrow();
  });
});
```

### Integration Tests (Playwright)
Test user flows: form submission, email delivery, page rendering.

```bash
# Run E2E tests
npm run test:e2e

# Headed mode (see browser)
npm run test:e2e:headed
```

**Example:** `__tests__/e2e/contact-form.spec.ts`
```typescript
import { test, expect } from '@playwright/test';

test('submit contact form and receive confirmation', async ({ page }) => {
  await page.goto('/en/contact');
  
  // Fill form
  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="phone"]', '9876543210');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.check('input[name="consent"]');
  
  // Submit
  await page.click('button[type="submit"]');
  
  // Verify confirmation message
  await expect(page.locator('text=Thank you')).toBeVisible();
});
```

### Accessibility Tests (Playwright + axe-core)

```bash
npm run test:a11y
```

Verify:
- Keyboard navigation (Tab, Enter)
- Screen reader compatibility (semantic HTML, ARIA labels)
- Color contrast (4.5:1 for text)

---

## Deployment Architecture

### Development Workflow
```
Local Development
  ↓ (git push to main)
GitHub Repository
  ↓ (CI/CD pipeline)
Vercel Staging
  ↓ (manual approval)
Vercel Production
```

### CI/CD Pipeline (GitHub Actions)

**`.github/workflows/build.yml`** (runs on every push)
```yaml
name: Build and Test

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test:unit
      - run: npm run build
```

**`.github/workflows/deploy.yml`** (runs on push to main)
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npx vercel deploy --prod --token ${{ secrets.VERCEL_TOKEN }}
```

### Vercel Deployment

**Automatic:**
1. Push to `main` branch
2. GitHub webhook triggers Vercel
3. Vercel builds and deploys to production
4. Domain updates automatically

**Environment Variables (Vercel Dashboard):**
- `RESEND_API_KEY` (secret)
- `CLINIC_EMAIL`
- `CLINIC_PHONE`
- `CLINIC_WHATSAPP`
- `RECAPTCHA_SECRET_KEY` (secret)
- `RECAPTCHA_SITE_KEY`

---

## Implementation Phases

### Phase 1: Project Setup (Days 1-2)
- [ ] Initialize Next.js with TypeScript, TailwindCSS
- [ ] Set up package.json with dependencies
- [ ] Configure next.config.ts, tailwind.config.ts, tsconfig.json
- [ ] Set up next-intl for English/Kannada
- [ ] Create lib/constants.ts with clinic info
- [ ] Set up GitHub repository and CI/CD pipelines

**Deliverable:** Working dev environment, `npm run dev` runs locally

### Phase 2: Layout & Navigation (Days 3-4)
- [ ] Create Header component with logo, nav, language selector
- [ ] Create Footer component with contact and branch info
- [ ] Create Root layout (app/layout.tsx)
- [ ] Create Language-scoped layout (app/[lang]/layout.tsx)
- [ ] Set up TailwindCSS theme (navy blue, orange colors)
- [ ] Add favicon and metadata

**Deliverable:** Consistent header/footer across all pages

### Phase 3: Core Pages (Days 5-8)
- [ ] Home page (hero + clinic info)
- [ ] About page (doctor bio, qualifications)
- [ ] Services page (treatments, specializations)
- [ ] Contact page (form layout, branch info)
- [ ] Privacy policy page
- [ ] 404 page

**Deliverable:** All pages render, navigation works, bilingual text loads

### Phase 4: Contact Form (Days 9-11)
- [ ] Build ContactForm component with React Hook Form
- [ ] Add form validation (Zod schema)
- [ ] Create server action for form submission (app/api/contact/route.ts)
- [ ] Integrate Resend for email delivery
- [ ] Add rate limiting and CAPTCHA
- [ ] Input sanitization and server-side validation
- [ ] Success/error handling and UX feedback

**Deliverable:** Form submits, emails sent, confirmation displayed

### Phase 5: Testing (Days 12-13)
- [ ] Write unit tests (validation, sanitization, helpers)
- [ ] Write E2E tests (form submission, page rendering, accessibility)
- [ ] Verify WCAG 2.1 AA compliance (keyboard nav, screen reader, contrast)
- [ ] Test on mobile devices (320px, 768px, 1440px)
- [ ] Load testing (Core Web Vitals: LCP < 2.5s)

**Deliverable:** All tests passing, accessibility verified

### Phase 6: Deployment & Launch (Days 14-15)
- [ ] Set up Vercel project
- [ ] Add environment variables (Resend API, clinic contact)
- [ ] Deploy to staging environment
- [ ] Final QA testing (forms, emails, performance)
- [ ] Deploy to production
- [ ] Monitor Vercel analytics and error tracking
- [ ] Set up Google Search Console and Analytics

**Deliverable:** Website live at production domain

### Phase 7: Post-Launch (Ongoing)
- [ ] Monitor form submissions and email delivery
- [ ] Track Core Web Vitals
- [ ] Update content as clinic provides new information
- [ ] Plan for Kannada translation or hire translator
- [ ] Gather feedback from clinic staff

---

## Local Development Setup

### Prerequisites
- Node.js 18+ (npm or yarn)
- Git
- Code editor (VS Code recommended)

### Getting Started

```bash
# Clone repository
git clone https://github.com/[your-org]/dr-ganiger-dental.git
cd dr-ganiger-dental

# Install dependencies
npm install

# Create .env.local (copy from .env.example)
cp .env.example .env.local

# Add values to .env.local
# RESEND_API_KEY=re_xxxxx
# CLINIC_EMAIL=drlakki34@gmail.com
# etc.

# Start development server
npm run dev

# Open http://localhost:3000 in browser
```

### Available Commands

```bash
npm run dev           # Start dev server (http://localhost:3000)
npm run build         # Build for production
npm start             # Start production server
npm run lint          # Run ESLint
npm run type-check    # Run TypeScript compiler
npm run test:unit     # Run unit tests (Vitest)
npm run test:e2e      # Run E2E tests (Playwright)
npm run test:a11y     # Run accessibility tests
npm run test:watch    # Watch mode for unit tests
npm run format        # Format code with Prettier
```

---

## Key Decisions Requiring Approval

**All of the following are confirmed for Option A; no additional approvals needed.**

1. ✅ **No database** — Simple contact form emails clinic directly
2. ✅ **No user authentication** — Website is public; no login required
3. ✅ **No admin dashboard** — Clinic manages appointments via email
4. ✅ **Resend for email** — Simple, free tier, reliable
5. ✅ **Vercel for deployment** — Native Next.js support, free tier
6. ✅ **Bilingual from launch** — English + Kannada
7. ✅ **reCAPTCHA v3** — Invisible spam protection
8. ✅ **No cookies/tracking** — Privacy-first approach
9. ✅ **Static pages** — SSG for fast performance
10. ✅ **Rate limiting** — Prevent form spam

---

## Dependencies (Final List)

### Core
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "typescript": "^5.0.0"
  }
}
```

### UI & Styling
```json
{
  "dependencies": {
    "tailwindcss": "^3.3.0",
    "postcss": "^8.4.0",
    "@tailwindcss/forms": "^0.5.0"
  }
}
```

### Forms & Validation
```json
{
  "dependencies": {
    "react-hook-form": "^7.48.0",
    "zod": "^3.22.0"
  }
}
```

### Internationalization
```json
{
  "dependencies": {
    "next-intl": "^2.20.0"
  }
}
```

### Email & Security
```json
{
  "dependencies": {
    "resend": "^2.0.0",
    "isomorphic-dompurify": "^1.12.0"
  }
}
```

### Dev Dependencies
```json
{
  "devDependencies": {
    "vitest": "^0.34.0",
    "@playwright/test": "^1.40.0",
    "axe-core": "^4.7.0",
    "eslint": "^8.52.0",
    "prettier": "^3.1.0"
  }
}
```

**Total size:** ~150 MB node_modules (manageable, no bloat)

---

## Monitoring & Observability (Post-Launch)

### Analytics
- **Google Analytics 4:** Track user behavior, conversion funnels
- **Vercel Analytics:** Real User Monitoring (RUM), Core Web Vitals
- **Form Submissions:** Log to Vercel logs or simple email alerts

### Error Tracking
- **Vercel Error Reporting:** Automatic error logs
- **Email Alerts:** If form submission fails, alert clinic

### Performance
- **Core Web Vitals targets:**
  - LCP < 2.5s (Largest Contentful Paint)
  - FID < 100ms (First Input Delay)
  - CLS < 0.1 (Cumulative Layout Shift)
- **Lighthouse score:** Target 90+

---

## Rollback & Disaster Recovery

### Rollback Procedure
If production breaks:
```bash
# Revert to last working commit
git revert [bad-commit-hash]
git push origin main

# Or rollback to previous Vercel deployment
# (Vercel dashboard → Deployments → select previous → Promote)
```

### Backups
- GitHub repository = automatic backup of all code
- No database backups needed (no database)
- Form submissions backed up in clinic email (accessible)

### Disaster Scenarios
| Scenario | Solution |
|----------|----------|
| Email service down | Form submission fails gracefully; clinic contacts patient manually |
| Website down | Vercel auto-failover; customer can still call clinic |
| Spam form submissions | Rate limiting blocks; clinic can add their phone to contact page |
| Clinic info outdated | Redeploy with updated lib/constants.ts; takes ~2 minutes |

---

## Success Criteria

### Technical
- ✅ TypeScript strict mode, zero `any` types
- ✅ All tests passing (unit, integration, E2E)
- ✅ WCAG 2.1 AA accessibility compliance verified
- ✅ Core Web Vitals all green (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- ✅ Zero unhandled errors in production
- ✅ Lighthouse score 90+
- ✅ Responsive on mobile (320px), tablet (768px), desktop (1440px)

### Functional
- ✅ All pages render in English and Kannada
- ✅ Contact form submits and emails clinic
- ✅ Patient receives acknowledgement email
- ✅ Clinic receives full appointment details
- ✅ Rate limiting prevents spam
- ✅ Form validation works (client + server)
- ✅ Doctor photo and clinic logo display correctly
- ✅ Branch info and hours are accurate

### Security
- ✅ No secrets in code or browser bundles
- ✅ Input validation and sanitization server-side
- ✅ HTTPS enforced
- ✅ CSP headers configured
- ✅ reCAPTCHA prevents automated abuse
- ✅ No XSS, SQL injection, CSRF vulnerabilities

### Operational
- ✅ CI/CD pipeline working (GitHub Actions → Vercel)
- ✅ Deployment takes < 2 minutes
- ✅ Form submission failures logged
- ✅ Easy to update clinic info (lib/constants.ts)
- ✅ Easy to add new pages or translations
- ✅ Documentation complete (README, setup guide)

---

## Next Steps

1. ✅ **Review this plan** — Confirm all components and phases
2. ⏳ **Approve to proceed** — Give go-ahead for implementation
3. ⏳ **Set up GitHub** — Create repository and configure CI/CD
4. ⏳ **Obtain Resend API key** — Sign up at resend.com
5. ⏳ **Obtain reCAPTCHA keys** — Sign up at google.com/recaptcha
6. ⏳ **Begin Phase 1** — Start development

---

## Questions & Clarifications

**Before implementation, confirm:**

1. **Kannada translations:** Will you provide them, or should I use a translator?
2. **Doctor photo:** Use the one from ASSETS.md, or get higher-res version?
3. **Clinic photos:** Do you have interior/facility photos to include?
4. **Domain:** Will this be `drganiger.com`, `ganigerdental.com`, or existing domain?
5. **Analytics:** OK to add Google Analytics 4 and Vercel analytics?
6. **WhatsApp:** Use standard wa.me links, or need QR code?

---

## Document Status

**Status:** ✅ Ready for Review & Implementation Approval  
**Next:** Confirm approvals, then begin Phase 1

