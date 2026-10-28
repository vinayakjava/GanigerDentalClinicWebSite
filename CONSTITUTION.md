# Engineering Constitution: Dr. Ganiger's Multispeciality Dental Clinic

**Project:** Dr. Ganiger's Multispeciality Dental Clinic & Implant Center  
**Operator:** Dr. Lakkappa S. Ganiger, BDS, MDS, Prosthodontist & Oral Implantologist  
**Purpose:** Professional, secure, and accessible web presence for patient appointments and clinic information

---

## Core Engineering Principles

### 1. Patient Privacy and Security First
Patient data is sacred. All architectural, technical, and design decisions prioritize patient privacy and security above convenience or feature completeness. Privacy is non-negotiable.

### 2. Never Collect Unnecessary Medical Information
Appointment forms request only what is clinically necessary:
- Patient name, phone, email
- Preferred appointment date/time
- Reason for visit (general category only, no detailed medical history in intake)

No medical history, allergies, medications, or detailed condition descriptions are collected through web forms. Clinical details are gathered during in-clinic consultation.

### 3. TypeScript Strict Mode and Maintainable Components
- All code is written in TypeScript with `strict: true`
- Components are reusable, well-typed, and composable
- Code is self-documenting with clear naming and minimal comments
- Maintainability takes precedence over premature optimization

### 4. Accessible Design and Semantic Standards
- All pages meet WCAG 2.1 AA accessibility standards
- Semantic HTML5 elements used appropriately (`<button>`, `<nav>`, `<main>`, `<article>`, etc.)
- Full keyboard navigation support
- Color contrast ratios meet or exceed 4.5:1 for body text, 3:1 for large text
- No functionality relies solely on color to convey meaning
- ARIA labels and roles used only when semantic HTML is insufficient

### 5. Responsive, Fast, SEO-Friendly, Mobile-First
- Mobile-first responsive design (tested at 320px, 768px, 1024px, 1440px+)
- Core Web Vitals optimized: LCP < 2.5s, FID < 100ms, CLS < 0.1
- Semantic HTML and structured data (JSON-LD) for SEO
- Meta tags, Open Graph, and canonical URLs properly configured
- Pages load and interactive within 2 seconds on 4G networks

### 6. Input Validation on Client and Server
- Client-side validation provides immediate user feedback (React Hook Form or equivalent)
- Server-side validation is authoritative and non-negotiable
- All inputs are sanitized to prevent injection attacks
- Validation errors are clear, actionable, and respect user experience

### 7. Supabase Row Level Security and Least-Privilege Access
- All appointment and patient data is stored with Row Level Security (RLS) enabled
- Database policies enforce least-privilege: users access only their own appointment data
- Admin/staff accounts have scoped permissions for appointment management only
- No wildcard permissions or bulk access

### 8. Secrets in Environment Variables Only
- All sensitive credentials (database keys, API keys, email service credentials) are in `.env.local` and never committed
- Client bundles contain zero sensitive information
- Public API keys (if any) are clearly marked and restricted by domain/IP
- Server-side environment variables are never logged or exposed

### 9. Never Invent Doctor Qualifications, Services, Testimonials, Hours, or Medical Claims
- Only information provided by Dr. Ganiger or clinic staff is published
- No invented specialist areas, success rates, patient testimonials, or opening hours
- No medical claims ("whitens teeth in 2 weeks", "guaranteed implant success")
- If information is missing, it is marked as "Available upon inquiry" or omitted

### 10. Appointments Are Requests Until Confirmed
- Online appointment submissions are treated as appointment *requests* only
- Status: "Pending clinic confirmation" until clinic staff reviews and confirms
- Confirmation is sent via email/phone by clinic staff
- Patients are not promised an appointment by submitting the form

### 11. Meaningful Application States
Every user-facing interaction includes appropriate states:
- **Loading:** Spinner or skeleton with accessible loading message
- **Success:** Clear success message with next steps
- **Error:** Descriptive error with retry option and fallback contact method
- **Empty:** Empty state messages when no data exists (e.g., "No upcoming appointments")
- **Retry:** Network failures offer explicit retry with exponential backoff

### 12. Automated Testing, Accessibility Checks, and Security Checks
- Unit tests cover business logic and critical paths (aim for 70%+ coverage)
- Integration tests verify form submission, email triggers, and data flow
- Accessibility tests via axe-core or similar in CI/CD
- Security checks: OWASP dependency scanning, secrets scanning, SAST
- Deployment documentation is maintained and tested

### 13. Never Deploy to Production Without Explicit Approval
- Staging environment matches production configuration and data
- No production deployments without documented approval
- No paid resources created, no email costs incurred, no production data modified without explicit instruction
- All changes are reviewed and tested before production merge

### 14. Prefer Simplicity Over Unnecessary Complexity
- Choose the simplest solution that reliably meets requirements
- Avoid over-engineering, premature optimization, or "future-proofing" with unused abstractions
- One technology stack chosen and used consistently (e.g., Next.js with Supabase, not Next.js + GraphQL + Redux)
- Every dependency is justified; unused libraries are removed

---

## Architectural Philosophy

This website serves a professional medical clinic. It is:
- **Trustworthy:** Clean, professional design; no dark patterns; transparent about data use
- **Secure:** Patient data protected with industry best practices
- **Accessible:** Usable by all patients, including those with disabilities
- **Fast:** Respects users' time and bandwidth
- **Maintainable:** Clear code that future developers can understand and extend without confusion

---

## Decision Framework

When in doubt, default to:
1. Patient privacy and security
2. User accessibility
3. Code simplicity and clarity
4. Professional, trustworthy appearance
5. Mobile-first responsiveness

---

## Next Steps

Once this constitution is reviewed and approved:
1. Project specification will be created (technologies, pages, data models)
2. Asset mapping will be finalized (logo, doctor photo, illustrations)
3. Component library will be designed
4. Implementation will begin with strict adherence to these principles
