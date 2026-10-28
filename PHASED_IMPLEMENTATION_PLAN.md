# Phased Technical Implementation Plan
## Dr. Ganiger's Dental Clinic Website + Admin System

**Approach:** Two-phase deployment (Option A → Option B)  
**Timeline:** 6 weeks total (3 weeks + 3 weeks)  
**Status:** Ready for Review and Approval  
**Last Updated:** 2026-10-28

---

## Overview

### Phase 1: Simple Website (Weeks 1-3)
- **Scope:** Option A - Informational website + contact form
- **Pages:** Home, About, Services, Contact, Privacy, Terms
- **Form:** Contact form emails clinic directly
- **No database, no authentication, no admin**
- **Launch:** Live website generating appointment requests

### Phase 2: Admin System (Weeks 4-6)
- **Scope:** Option B - Add appointment database + admin dashboard
- **Database:** Supabase PostgreSQL
- **Auth:** Supabase Auth for admin login
- **Admin Dashboard:** View/manage appointments, set holidays, track status
- **Public Pages:** Unchanged; form now stores in database + emails clinic
- **Enhancement:** Zero downtime upgrade (Phase 1 users unaffected)

### Combined Benefits
- ✅ **Fast launch** (3 weeks for working website)
- ✅ **Real usage data** (appointments flowing in)
- ✅ **Build smartly** (Phase 2 on proven foundation)
- ✅ **Lower risk** (validate Phase 1 before adding complexity)
- ✅ **Flexible** (can launch Phase 2 later if priorities change)

---

## Phase 1: Simple Website (Weeks 1-3)

### Phase 1 Tech Stack
```
Frontend:     Next.js 14 + TypeScript + React + TailwindCSS
i18n:         next-intl (English/Kannada)
Forms:        React Hook Form + Zod
Email:        Resend (transactional)
Deployment:   Vercel
Testing:      Vitest + Playwright
Version:      Git + GitHub
Database:     None (email-only)
Auth:         None
```

### Phase 1 Directory Structure

```
dr-ganiger-dental/
├── CONSTITUTION.md
├── SPECIFICATION.md
├── ASSETS.md
├── CLAUDE.md
├── IMPLEMENTATION_PLAN.md
├── PHASED_IMPLEMENTATION_PLAN.md (this file)
├── CHECKLIST.md
├── TASKS.md
├── ANALYSIS.md
│
├── app/
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Redirect to [lang]
│   │
│   ├── [lang]/                       # Language-scoped routes
│   │   ├── layout.tsx                # Language layout (header, footer)
│   │   ├── page.tsx                  # Home page
│   │   ├── about/page.tsx            # About doctor
│   │   ├── services/page.tsx         # Services list
│   │   ├── contact/page.tsx          # Contact form + info
│   │   ├── privacy/page.tsx          # Privacy policy
│   │   ├── terms/page.tsx            # Terms of service
│   │   └── not-found.tsx             # 404 page
│   │
│   ├── api/
│   │   └── contact/
│   │       └── route.ts              # Form submission handler (POST)
│   │
│   ├── sitemap.ts                    # SEO sitemap
│   └── robots.ts                     # robots.txt
│
├── components/
│   ├── Header.tsx                    # Navigation + logo
│   ├── Footer.tsx                    # Contact info
│   ├── Hero.tsx                      # Home hero section
│   ├── ContactForm.tsx               # Contact form
│   ├── ServiceCard.tsx               # Service card
│   ├── BranchCard.tsx                # Branch location
│   └── LanguageSelector.tsx          # EN/KN toggle
│
├── lib/
│   ├── constants.ts                  # Clinic info
│   ├── validation.ts                 # Zod schemas (Phase 1 + 2)
│   ├── email.ts                      # Resend utilities
│   ├── sanitize.ts                   # Input sanitization
│   ├── rateLimit.ts                  # Rate limiting
│   └── utils.ts                      # Helpers
│
├── public/
│   ├── logo.svg
│   ├── favicon.ico
│   └── images/
│       ├── doctor.jpg
│       └── (clinic photos if available)
│
├── messages/
│   ├── en.json                       # English translations
│   └── kn.json                       # Kannada translations
│
├── styles/
│   └── globals.css                   # TailwindCSS + global styles
│
├── __tests__/
│   ├── lib/
│   │   ├── validation.test.ts
│   │   └── sanitize.test.ts
│   ├── components/
│   │   └── ContactForm.test.tsx
│   └── e2e/
│       ├── home.spec.ts
│       ├── contact-form.spec.ts
│       └── accessibility.spec.ts
│
├── .env.example
├── .env.local (git ignored)
├── .gitignore
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
├── vitest.config.ts
├── playwright.config.ts
├── package.json
└── package-lock.json
```

### Phase 1 Implementation (Weeks 1-3)

**Total tasks:** 93 (documented in TASKS.md)  
**Estimated hours:** 60-80  
**Breakdown:**
- Week 1: Setup + Layout (20 tasks, ~20 hours)
- Week 2: Pages + Form (30 tasks, ~30 hours)
- Week 3: Testing + Deployment (43 tasks, ~30 hours)

*See TASKS.md for detailed task breakdown*

### Phase 1 Deliverables
- ✅ Website live at production domain
- ✅ All pages rendering (Home, About, Services, Contact, Privacy, Terms)
- ✅ Contact form submitting and emailing clinic
- ✅ Bilingual (English + Kannada)
- ✅ Mobile responsive
- ✅ WCAG 2.1 AA accessible
- ✅ All tests passing (unit, E2E, accessibility)
- ✅ Performance: Lighthouse 90+
- ✅ Security: No secrets exposed, input validated/sanitized
- ✅ Monitoring: Vercel analytics, error tracking

### Phase 1 Form Flow (Email-Based)

```
Patient submits form
    ↓
Client validation (React Hook Form)
    ↓
Server validation + sanitization (app/api/contact/route.ts)
    ↓
Rate limiting check + reCAPTCHA
    ↓
Send 2 emails (Resend):
  1. Clinic notification (drlakki34@gmail.com)
  2. Patient acknowledgement (patient@example.com)
    ↓
Display "Thank you" message
    ↓
Clinic staff receives email, calls/WhatsApps patient to confirm
```

---

## Phase 2: Admin System (Weeks 4-6)

### Phase 2 Architecture

**Phase 2 adds:**
- Supabase PostgreSQL database
- Supabase Auth for admin login
- Admin dashboard (`/admin` protected routes)
- Appointment storage (instead of email-only)
- Row Level Security (RLS) policies
- Holiday management
- Appointment status tracking

**Phase 1 users:** Unaffected (website continues working)  
**Migration:** Form submissions now store in DB + email clinic (backward compatible)

### Phase 2 Tech Stack (Additions)

```
Database:     Supabase PostgreSQL
Auth:         Supabase Auth (email/password)
ORM:          Supabase JS client (or Prisma optional)
Admin UI:     React + TailwindCSS (new pages)
Security:     RLS policies on all tables
Testing:      E2E tests for admin flows
```

### Phase 2 Database Schema

#### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  role TEXT CHECK (role IN ('admin', 'receptionist')),
  branch_id UUID REFERENCES branches(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- RLS: Users can only view/edit their own profile
-- Admins can view all users at their branch
```

#### Branches Table
```sql
CREATE TABLE branches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp_phone TEXT,
  hours_open TIME NOT NULL,
  hours_close TIME NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Data: 
-- Branch 1: Athani - 10:00 AM to 5:00 PM
-- Branch 2: Ainapur - 6:00 PM to 8:30 PM
```

#### Operating Hours Table
```sql
CREATE TABLE operating_hours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  branch_id UUID REFERENCES branches(id) NOT NULL,
  day_of_week INTEGER CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0=Sunday, 6=Saturday
  is_open BOOLEAN DEFAULT TRUE,
  hours_open TIME,
  hours_close TIME,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(branch_id, day_of_week)
);

-- Data:
-- Athani: Mon-Sun 10:00 AM - 5:00 PM (is_open = true for all days)
-- Ainapur: Mon-Sat 6:00 PM - 8:30 PM (is_open = false for Sunday)
```

#### Holidays Table
```sql
CREATE TABLE holidays (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  branch_id UUID REFERENCES branches(id),
  holiday_date DATE NOT NULL,
  holiday_name TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(branch_id, holiday_date)
);

-- Index: For fast lookup of holidays on a given date
CREATE INDEX holidays_date_idx ON holidays(branch_id, holiday_date);
```

#### Appointment Requests Table
```sql
CREATE TABLE appointment_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Patient info
  patient_name TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  patient_email TEXT NOT NULL,
  
  -- Appointment details
  preferred_branch_id UUID REFERENCES branches(id),
  preferred_date DATE,
  preferred_time TIME,
  message TEXT,
  
  -- Status tracking
  status TEXT DEFAULT 'pending' CHECK (
    status IN ('pending', 'confirmed', 'rejected', 'completed', 'cancelled')
  ),
  confirmed_by UUID REFERENCES users(id),
  confirmed_at TIMESTAMP,
  confirmation_notes TEXT,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT
);

-- Indexes for fast queries
CREATE INDEX requests_branch_idx ON appointment_requests(preferred_branch_id);
CREATE INDEX requests_status_idx ON appointment_requests(status);
CREATE INDEX requests_date_idx ON appointment_requests(preferred_date);
CREATE INDEX requests_created_idx ON appointment_requests(created_at DESC);

-- RLS: Admins can only see appointments for their branch
-- Patients cannot access this table (read-only through form)
```

### Phase 2 Directory Structure (Additions)

```
dr-ganiger-dental/ (Phase 1 files continue)
│
├── app/
│   ├── admin/
│   │   ├── layout.tsx                # Admin layout (header, sidebar)
│   │   ├── page.tsx                  # Admin dashboard (redirect to appointments)
│   │   ├── login/
│   │   │   ├── page.tsx              # Login page
│   │   │   └── actions.ts            # Sign in server action
│   │   ├── appointments/
│   │   │   ├── page.tsx              # List appointments
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx          # View appointment details
│   │   │   │   └── actions.ts        # Update status, confirm, etc.
│   │   │   └── actions.ts            # List/filter appointments
│   │   ├── holidays/
│   │   │   ├── page.tsx              # Manage holidays
│   │   │   └── actions.ts            # Add/delete holidays
│   │   ├── hours/
│   │   │   ├── page.tsx              # Manage operating hours
│   │   │   └── actions.ts            # Update hours
│   │   ├── users/
│   │   │   ├── page.tsx              # Manage admin users (if needed)
│   │   │   └── actions.ts
│   │   └── middleware.ts             # Auth check for /admin routes
│   │
│   ├── api/
│   │   ├── contact/
│   │   │   ├── route.ts              # UPDATED: Store in DB + email
│   │   │   └── actions.ts
│   │   ├── auth/
│   │   │   └── [route]/
│   │   │       └── route.ts          # Supabase auth routes
│   │   └── appointments/
│   │       └── route.ts              # Optional: API for appointments
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts                 # Supabase client (browser)
│   │   ├── server.ts                 # Supabase client (server)
│   │   └── admin.ts                  # Admin functions (user, holiday mgmt)
│   ├── appointments.ts               # Appointment DB functions
│   ├── auth.ts                       # Auth helpers
│   ├── middleware.ts                 # Auth middleware
│   └── (Phase 1 files continue)
│
├── hooks/
│   ├── useAuth.ts                    # Auth context hook
│   └── useAppointments.ts            # Appointments query hook
│
├── __tests__/
│   ├── lib/
│   │   ├── appointments.test.ts      # DB function tests
│   │   └── (Phase 1 tests continue)
│   ├── components/
│   │   ├── AdminAppointmentList.test.tsx
│   │   └── (Phase 1 tests continue)
│   └── e2e/
│       ├── admin-login.spec.ts       # Admin auth flow
│       ├── admin-appointments.spec.ts # Appointment management
│       ├── admin-holidays.spec.ts    # Holiday management
│       └── (Phase 1 tests continue)
│
├── components/
│   ├── admin/
│   │   ├── AdminNav.tsx              # Admin navigation
│   │   ├── AppointmentList.tsx       # List appointments
│   │   ├── AppointmentDetail.tsx     # View/edit appointment
│   │   ├── HolidayForm.tsx           # Add holiday
│   │   ├── HourForm.tsx              # Update hours
│   │   └── ConfirmationModal.tsx     # Confirm appointment
│   └── (Phase 1 components continue)
│
├── supabase/
│   └── migrations/
│       ├── 001_create_users.sql
│       ├── 002_create_branches.sql
│       ├── 003_create_operating_hours.sql
│       ├── 004_create_holidays.sql
│       ├── 005_create_appointment_requests.sql
│       └── 006_rls_policies.sql
│
├── .env.example (UPDATED)
├── .env.local (UPDATED, git ignored)
├── tsconfig.json (unchanged)
├── (Phase 1 config files continue)
```

### Phase 2 Security Design

#### Authentication Flow
```
1. Admin visits /admin
2. Middleware checks for Supabase session
3. If not authenticated → redirect to /admin/login
4. Admin signs in with email/password (Supabase Auth)
5. Session stored (secure cookie, HTTP-only)
6. Access /admin/appointments, /admin/holidays, etc.
7. Each route validates user role and branch access
```

#### Authorization Rules

**Admin Operations:**
- ✅ View appointments for their branch only
- ✅ Confirm/reject appointments
- ✅ Add/delete holidays for their branch
- ✅ Update operating hours for their branch
- ✅ View their own profile

**Receptionist (future):**
- ✅ View appointments for their branch
- ✅ Update appointment status (receptionist can call patients)
- ❌ Cannot delete appointments
- ❌ Cannot change operating hours

#### Row Level Security (RLS)

All tables protected with RLS policies:

**Users:**
```sql
-- Users can view their own record
CREATE POLICY user_view_own ON users
  FOR SELECT
  USING (auth.uid() = id);

-- Admins can view all users at their branch
CREATE POLICY admin_view_branch_users ON users
  FOR SELECT
  USING (
    auth.jwt() ->> 'user_role' = 'admin'
    AND branch_id = (
      SELECT branch_id FROM users WHERE id = auth.uid()
    )
  );
```

**Appointments:**
```sql
-- Prevent anonymous read
CREATE POLICY prevent_anonymous_read ON appointment_requests
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Admins see appointments for their branch
CREATE POLICY admin_view_branch_appointments ON appointment_requests
  FOR SELECT
  USING (
    auth.role() = 'authenticated'
    AND preferred_branch_id = (
      SELECT branch_id FROM users WHERE id = auth.uid()
    )
  );

-- Only authenticated users can update (via admin confirm action)
CREATE POLICY admin_update_appointments ON appointment_requests
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
```

**Holidays:**
```sql
CREATE POLICY admin_manage_holidays ON holidays
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (
    branch_id = (SELECT branch_id FROM users WHERE id = auth.uid())
  );
```

#### Environment Variables (Phase 2)

```env
# .env.local (server-side secrets only)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=public_key_safe_to_expose
SUPABASE_SERVICE_ROLE_KEY=secret_never_expose
SUPABASE_JWT_SECRET=secret_key_for_validation

# Phase 1 env vars (continue)
RESEND_API_KEY=re_xxxxx
CLINIC_EMAIL=drlakki34@gmail.com
CLINIC_PHONE=9448932092
CLINIC_WHATSAPP=9448932092
RECAPTCHA_SECRET_KEY=xxxxx
RECAPTCHA_SITE_KEY=xxxxx
```

**Key points:**
- `SUPABASE_SERVICE_ROLE_KEY` only used on server (never in browser)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` safe to expose (limited by RLS)
- Admin operations use service role key (server-side auth)
- All secrets in `.env.local` (git ignored)

### Phase 2 Form Update

**Phase 1 form flow:** Submit → Email only  
**Phase 2 form flow:** Submit → Store in DB + Email

```typescript
// app/api/contact/route.ts (UPDATED for Phase 2)

export async function POST(request: Request) {
  const data = await request.json();
  
  // Validate and sanitize (Phase 1 logic)
  const validated = contactFormSchema.parse(data);
  
  // NEW: Store in Supabase
  const { data: appointment, error } = await supabase
    .from('appointment_requests')
    .insert([{
      patient_name: validated.name,
      patient_phone: validated.phone,
      patient_email: validated.email,
      preferred_date: validated.preferredDate,
      message: validated.message,
      status: 'pending',
      ip_address: getClientIp(request),
    }]);
  
  if (error) {
    // Log error but still send email (don't lose request)
    console.error('DB insert failed:', error);
    // Send to clinic anyway
  }
  
  // CONTINUE: Send emails (Phase 1 logic)
  await sendClinicEmail(validated);
  await sendPatientEmail(validated);
  
  return Response.json({ success: true });
}
```

### Phase 2 Admin Dashboard

**Appointments Page** (`/admin/appointments`)
- List all appointments for admin's branch
- Filter by status (pending, confirmed, rejected, completed)
- Filter by date range
- Search by patient name/phone
- Bulk actions (confirm, reject multiple)
- Pagination (20 per page)
- Sort by created_at, preferred_date, status

**Appointment Detail** (`/admin/appointments/[id]`)
- View full appointment details
- Confirm appointment → set status to 'confirmed', send patient SMS/email
- Reject appointment → set status to 'rejected', send rejection email
- Add notes
- View confirmation history

**Holidays Page** (`/admin/holidays`)
- View holidays for admin's branch
- Add holiday: date + name (e.g., "Diwali", "Staff Training")
- Delete holiday
- Bulk import holidays (CSV optional)

**Hours Page** (`/admin/hours`)
- Edit operating hours for each day
- Set hours open/close
- Toggle day on/off (e.g., Sunday closed for Ainapur)
- Apply to all branches or single branch (if multi-branch)

**Users Page** (Optional, Phase 2+)
- View admin users
- Add new admin
- Reset password
- Deactivate user

### Phase 2 Implementation (Weeks 4-6)

**Week 4: Database + Admin Setup**
- Supabase project creation
- Database schema and migrations
- RLS policies setup
- Supabase Auth configuration
- Admin login page and authentication

**Week 5: Admin Features**
- Appointments management (list, view, confirm, reject)
- Holiday management
- Operating hours management
- E2E tests for admin flows
- Error handling and edge cases

**Week 6: Integration + Testing**
- Update form to store in DB
- Test Phase 1 ↔ Phase 2 integration
- Full E2E testing (admin workflows)
- Performance testing (query optimization)
- Security audit (RLS, auth, validation)
- Deployment to staging
- Final QA

### Phase 2 Deliverables
- ✅ Supabase PostgreSQL database set up
- ✅ Admin login (Supabase Auth)
- ✅ Admin dashboard with appointment management
- ✅ Holiday and hours management
- ✅ Form now stores in database + emails
- ✅ RLS policies protecting data
- ✅ All admin operations validated server-side
- ✅ All tests passing (unit, E2E, admin workflows)
- ✅ Zero downtime deployment (Phase 1 continues)
- ✅ Admin user guides / documentation

---

## Integration Between Phases

### Phase 1 → Phase 2 Transition

**Seamless upgrade (zero downtime):**

1. **Phase 1 running:** Website live, form emails clinic
2. **Phase 2 deploy:** Add Supabase, update form logic
3. **Form now does both:** Store in DB + Email clinic
4. **Admin dashboard:** Available for clinic staff to use
5. **No interruption:** Phase 1 users continue normally
6. **New feature:** Clinic can track appointments in system

### Backward Compatibility

**Phase 1 email flow continues in Phase 2:**
- Form submission still emails clinic
- Admin can review appointments in dashboard OR email
- Two-track system (flexible transition)
- Later (Phase 2+): Clinic can choose email-only or dashboard-only

### Data Migration (If Needed)

If Phase 1 runs for weeks before Phase 2 launches:
- Existing emails in clinic inbox stay as-is
- New appointments (Phase 2 onwards) stored in DB
- Option to manually import past emails into DB (not required)

---

## Complete Directory Structure (Both Phases)

```
dr-ganiger-dental/
├── CONSTITUTION.md
├── SPECIFICATION.md
├── ASSETS.md
├── CLAUDE.md
├── IMPLEMENTATION_PLAN.md
├── PHASED_IMPLEMENTATION_PLAN.md (this file)
├── CHECKLIST.md
├── TASKS.md
├── ANALYSIS.md
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   │
│   ├── [lang]/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   └── not-found.tsx
│   │
│   ├── api/
│   │   ├── contact/route.ts              (PHASE 1 + 2)
│   │   └── auth/[route]/route.ts         (PHASE 2)
│   │
│   └── admin/                            (PHASE 2)
│       ├── layout.tsx
│       ├── page.tsx
│       ├── login/page.tsx
│       ├── appointments/
│       │   ├── page.tsx
│       │   ├── [id]/page.tsx
│       │   └── actions.ts
│       ├── holidays/
│       │   ├── page.tsx
│       │   └── actions.ts
│       ├── hours/
│       │   ├── page.tsx
│       │   └── actions.ts
│       └── users/                       (PHASE 2+)
│           ├── page.tsx
│           └── actions.ts
│
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ContactForm.tsx
│   ├── ServiceCard.tsx
│   ├── BranchCard.tsx
│   ├── LanguageSelector.tsx
│   │
│   └── admin/                            (PHASE 2)
│       ├── AdminNav.tsx
│       ├── AppointmentList.tsx
│       ├── AppointmentDetail.tsx
│       ├── HolidayForm.tsx
│       ├── HourForm.tsx
│       └── ConfirmationModal.tsx
│
├── lib/
│   ├── constants.ts
│   ├── validation.ts
│   ├── email.ts
│   ├── sanitize.ts
│   ├── rateLimit.ts
│   ├── utils.ts
│   │
│   ├── supabase/                        (PHASE 2)
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── admin.ts
│   │
│   ├── appointments.ts                  (PHASE 2)
│   ├── auth.ts                          (PHASE 2)
│   ├── middleware.ts                    (PHASE 2)
│
├── hooks/                               (PHASE 2)
│   ├── useAuth.ts
│   └── useAppointments.ts
│
├── public/
│   ├── logo.svg
│   ├── favicon.ico
│   └── images/
│       ├── doctor.jpg
│       └── (clinic photos)
│
├── messages/
│   ├── en.json
│   └── kn.json
│
├── styles/
│   └── globals.css
│
├── supabase/                            (PHASE 2)
│   └── migrations/
│       ├── 001_create_users.sql
│       ├── 002_create_branches.sql
│       ├── 003_create_operating_hours.sql
│       ├── 004_create_holidays.sql
│       ├── 005_create_appointment_requests.sql
│       └── 006_rls_policies.sql
│
├── __tests__/
│   ├── lib/
│   │   ├── validation.test.ts
│   │   ├── sanitize.test.ts
│   │   └── appointments.test.ts         (PHASE 2)
│   ├── components/
│   │   ├── ContactForm.test.tsx
│   │   └── AdminAppointmentList.test.tsx (PHASE 2)
│   └── e2e/
│       ├── home.spec.ts
│       ├── contact-form.spec.ts
│       ├── accessibility.spec.ts
│       ├── admin-login.spec.ts          (PHASE 2)
│       ├── admin-appointments.spec.ts   (PHASE 2)
│       └── admin-holidays.spec.ts       (PHASE 2)
│
├── .env.example
├── .env.local (git ignored)
├── .gitignore
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
├── vitest.config.ts
├── playwright.config.ts
├── package.json
├── package-lock.json
└── README.md
```

---

## Timeline & Milestones

### Phase 1: Simple Website (Weeks 1-3)

| Week | Milestones |
|------|-----------|
| **Week 1** | Project setup (3 days), Layout & navigation (4 days) |
| **Week 2** | Core pages (Mon-Wed), Contact form (Thu-Fri) |
| **Week 3** | Testing & QA (Mon-Tue), Deploy to production (Wed-Fri) |

**Phase 1 Go-Live:** End of Week 3
- Website live
- Form submissions emailing clinic
- Clinic staff receiving and confirming appointments

### Phase 2: Admin System (Weeks 4-6)

| Week | Milestones |
|------|-----------|
| **Week 4** | Supabase setup (Mon-Tue), Database schema (Wed-Thu), Admin auth (Fri) |
| **Week 5** | Appointment mgmt (Mon-Wed), Holidays & hours (Thu-Fri) |
| **Week 6** | Integration testing (Mon-Tue), Final QA (Wed-Thu), Deploy to prod (Fri) |

**Phase 2 Go-Live:** End of Week 6
- Admin dashboard live
- Clinic can view/manage appointments
- Optional: Email or dashboard (choice)

---

## Architectural Decisions Requiring Approval

### Decision 1: Two-Phase Approach
**Question:** Should we build Option A first, then add Option B? Or build both together?

**Recommendation:** Two-phase (Option A → Option B)
- **Pros:** Faster launch, lower risk, real usage data guides Phase 2
- **Cons:** Slight extra work in form integration (Phase 1 email → Phase 2 DB)

**Alternative:** Build everything at once
- **Pros:** Fewer integration points
- **Cons:** 6 weeks to launch (vs 3 weeks), more complex Phase 1, more risk

**Status:** ⏳ Needs approval

---

### Decision 2: Database Choice (Supabase vs. Prisma)
**Question:** Use Supabase JS client directly, or add Prisma ORM?

**Recommendation:** Supabase JS client directly (no Prisma)
- **Pros:** Fewer dependencies, Supabase auth native, RLS works cleanly
- **Cons:** Less abstraction, slightly more SQL

**Alternative:** Prisma + Supabase
- **Pros:** Better TypeScript support, migrations easier
- **Cons:** Extra dependency, slightly more setup, RLS less intuitive with ORM

**Status:** ⏳ Needs approval

---

### Decision 3: Admin Auth Method
**Question:** Supabase Auth (email/password) or another method?

**Recommendation:** Supabase Auth (email/password)
- **Pros:** Built-in, secure, email verification, password reset, multi-user support
- **Cons:** Clinic staff need to remember password (but password reset available)

**Alternative:** API key authentication
- **Pros:** No password (one-time setup)
- **Cons:** Less secure, no multi-user support, harder to rotate

**Status:** ⏳ Needs approval

---

### Decision 4: RLS (Row Level Security)
**Question:** Use Supabase RLS for all data access, or trust backend?

**Recommendation:** Use RLS + backend validation
- **Pros:** Defense in depth, prevents accidental data leakage, proper security model
- **Cons:** Slightly more setup time, RLS policies to maintain

**Alternative:** Trust only backend validation
- **Pros:** Less RLS complexity
- **Cons:** Single point of failure, less secure if backend has bugs

**Status:** ⏳ Needs approval

---

### Decision 5: Form Storage (Email vs. Database)
**Question:** Should appointments be stored in database, or only emailed?

**Phase 2 approach:** Both (store in DB + email clinic)
- **Pros:** Clinic has email (familiar) + dashboard (new feature), flexible
- **Cons:** Slight redundancy

**Alternative:** Database only (no email)
- **Pros:** Single source of truth
- **Cons:** Forces clinic to use dashboard, no email fallback

**Status:** ⏳ Needs approval (using both is recommended)

---

## Testing Strategy (Both Phases)

### Phase 1 Testing
- Unit tests: Validation, sanitization, helpers
- E2E tests: Page rendering, form submission, email delivery
- Accessibility: WCAG 2.1 AA compliance
- Performance: Lighthouse 90+
- Security: Input validation, XSS prevention, no secrets exposed

### Phase 2 Testing (Additional)
- Unit tests: DB functions, appointment queries, holiday logic
- Integration tests: Form ↔ DB ↔ email flow
- E2E tests: Admin login, appointment management, holiday management
- Security: RLS policies, auth validation, unauthorized access blocked
- Performance: DB query optimization (indexes, N+1 queries)

---

## Deployment Strategy (Both Phases)

### Phase 1 Deployment
- Vercel (auto-deploy on git push)
- GitHub Actions CI/CD (test, lint, build, deploy)
- Staging environment for final QA
- Production deployment with monitoring

### Phase 2 Deployment (Zero-Downtime)
- Create Supabase project in parallel (Week 4)
- Deploy database schema and migrations
- Deploy admin routes (initially hidden from menu)
- Update form logic to store in DB
- Enable admin menu and announce to clinic staff
- No interruption to Phase 1 users
- Rollback possible if needed (previous Vercel deployment)

---

## Success Criteria

### Phase 1 Success
- ✅ Website live at production domain
- ✅ Contact form submitting and emailing clinic
- ✅ Clinic receiving appointment requests
- ✅ All pages rendering correctly (Home, About, Services, Contact)
- ✅ Bilingual (English + Kannada)
- ✅ Mobile responsive
- ✅ WCAG 2.1 AA accessible
- ✅ All tests passing
- ✅ Lighthouse 90+
- ✅ No secrets exposed

### Phase 2 Success
- ✅ Supabase database live
- ✅ Admin login working (Supabase Auth)
- ✅ Admin can view appointments
- ✅ Admin can confirm/reject appointments
- ✅ Admin can manage holidays
- ✅ Admin can update operating hours
- ✅ Form submitting to DB + email clinic
- ✅ RLS policies protecting data
- ✅ All tests passing (including admin workflows)
- ✅ Zero downtime during deployment

---

## Risks & Mitigation

### Phase 1 Risks
| Risk | Mitigation |
|------|-----------|
| Email spam filtering | Use professional email service (Resend), test delivery |
| Rate limiting issues | Test rate limiting, adjust thresholds |
| Mobile responsiveness | Test on real devices, DevTools |
| Performance | Use next/Image, SSG, CSS optimization |

### Phase 2 Risks
| Risk | Mitigation |
|------|-----------|
| Supabase downtime | Monitor Supabase status, have email fallback |
| RLS misconfiguration | Test RLS policies thoroughly, security review |
| Admin auth bypass | Validate all admin operations server-side |
| DB query performance | Use indexes, test with realistic data |
| Data migration issues | Use non-destructive schema (backward compatible) |

---

## Cost Estimate

### Phase 1 (Weeks 1-3)
- Development: 60-80 hours
- Cost: ~₹30,000-50,000 (India rates)

### Phase 2 (Weeks 4-6)
- Development: 40-60 hours
- Cost: ~₹20,000-30,000

### Infrastructure (Annual)
| Component | Phase 1 | Phase 2 |
|-----------|---------|---------|
| Vercel | $0-10 | $0-10 |
| Supabase | $0 | $0-50 (free tier, pay if scaled) |
| Resend | $0-20 | $0-20 |
| Domain | $50-200 | $50-200 |
| **Total/Year** | ~$100-250 | ~$200-350 |

---

## Approval Checklist

Before implementation begins, please confirm:

- [ ] **Phase 1 (Weeks 1-3):** Simple website, email-based form approved
- [ ] **Phase 2 (Weeks 4-6):** Admin system with Supabase approved
- [ ] **Two-phase approach:** Sequential deployment approved
- [ ] **Tech stack:** Next.js, TypeScript, TailwindCSS, next-intl, Resend, Vercel, Supabase approved
- [ ] **Database schema:** Provided schema and RLS policies reviewed
- [ ] **Security model:** Server-side validation, RLS, auth approach approved
- [ ] **Testing approach:** Unit, E2E, accessibility, performance testing approved
- [ ] **Timeline:** 3 weeks Phase 1 + 3 weeks Phase 2 acceptable
- [ ] **Cost:** Development and infrastructure costs acceptable
- [ ] **Risks:** Identified risks and mitigations understood

---

## Next Steps (Upon Approval)

1. ✅ Finalize and approve this plan
2. ⏳ Set up GitHub repository and CI/CD
3. ⏳ Begin Phase 1 implementation (Week 1)
4. ⏳ Prepare Supabase project (during Phase 1, deploy in Week 4)
5. ⏳ Phase 1 go-live (end of Week 3)
6. ⏳ Begin Phase 2 implementation (Week 4)
7. ⏳ Phase 2 go-live (end of Week 6)

---

## Document History

| Version | Date | Status |
|---------|------|--------|
| 1.0 | 2026-10-28 | Draft - Awaiting Approval |

