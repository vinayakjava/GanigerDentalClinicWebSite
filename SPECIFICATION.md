# Dr. Ganiger's Dental Clinic Website — Specification & Business Rules

**Status:** Draft - Awaiting clinic input on critical business decisions  
**Clinic:** Dr. Ganiger's Multispeciality Dental Clinic & Implant Center  
**Operator:** Dr. Lakkappa S. Ganiger, BDS, MDS, Prosthodontist & Oral Implantologist

---

## Status Summary

### ✅ Confirmed Decisions (3/10)
1. ✅ Sunday holiday for Ainapur only; Athani operates all 7 days
2. ✅ Athani: 10 AM - 5 PM; Ainapur: 6 PM - 8:30 PM
3. ✅ National holidays configurable by admin
4. ✅ Language support: English and Kannada at launch

### ⏳ Still Required (7/10)
- [ ] Appointment confirmation model (manual vs. auto-slot)
- [ ] Appointment slot intervals (15/20/30 min, if applicable)
- [ ] Contact number(s) and WhatsApp availability
- [ ] Email notification routing
- [ ] Admin account creation method
- [ ] Confirmation email expectations
- [ ] Kannada translation method (clinic or professional translator)

---

## Critical Business Rule Decisions

The following items **materially affect implementation** and require explicit clinic input before development begins.

### 1. Sunday Holiday Policy
**Question:** Is Sunday a holiday for both clinic branches (Ainapur and Athani), or only one?

**Impact:** Determines appointment availability calendar, automated slot generation, and holiday exclusion logic.

**Status:** ✅ **CONFIRMED**

**Clinic Confirmation:**
- [ ] Sunday is a holiday for both branches
- [x] Sunday is a holiday for Ainapur only
- [ ] Sunday is a holiday for Athani only
- [ ] Sunday is NOT a holiday for either branch

**Details:** Athani branch operates every day including Sunday (10 AM - 5 PM). Ainapur is closed on Sundays.

---

### 2. Athani Branch Operating Schedule
**Question:** Does the Athani branch operate every day of the week? Are there specific weekly holidays (other than Sunday)?

**Impact:** Determines which days are available for appointment requests at each location, calendar configuration, and branch-specific scheduling logic.

**Status:** ✅ **CONFIRMED**

**Clinic Confirmation:**
- [x] Athani operates 7 days a week (no weekly holidays)
- [ ] Athani operates 6 days a week with holiday on: ________
- [ ] Athani operates specific days only: ________
- [ ] Athani has different operating days than Ainapur

**Confirmed Details:**
- Operating hours for Athani: **10:00 AM to 5:00 PM** (7 days a week)
- Operating hours for Ainapur: **6:00 PM to 8:30 PM** (Monday-Saturday, closed Sundays)

---

### 3. Appointment Confirmation Model
**Question:** Are appointment requests manually confirmed by clinic staff, or are exact time slots automatically reserved?

**Impact:** Determines database schema, email automation, user expectations, and admin workflow. This is a core architectural decision.

**Status:** ⏳ **UNRESOLVED** — Awaiting clinic confirmation

**Clinic Input Required:**
- [ ] **Manual Confirmation Model:** Patients submit requests → clinic staff reviews and emails confirmation → slot is held
- [ ] **Auto-Reservation Model:** Patients select exact time slot → system automatically reserves it → immediate confirmation email
- [ ] **Hybrid Model:** (Please describe) __________

**Rationale for Choice:**
- Clinic staff availability for prompt confirmation?
- Clinic preference for avoiding no-shows?
- Patient expectation for immediate vs. next-day confirmation?

---

### 4. Appointment Slot Interval
**Question:** If exact time slots are used (auto-reservation or manual), what is the appointment interval?

**Impact:** Determines slot generation algorithm, calendar UI, and scheduling efficiency.

**Status:** ⏳ **UNRESOLVED** — Awaiting clinic confirmation (if applicable)

**Clinic Input Required (if appointment slots are used):**
- [ ] 15-minute intervals
- [ ] 20-minute intervals
- [ ] 30-minute intervals
- [ ] 45-minute intervals
- [ ] 60-minute intervals
- [ ] Other: ________

**Additional Details:**
- Appointments per day at Ainapur: ________
- Appointments per day at Athani: ________
- Or appointment slots per doctor/specialist: ________

---

### 5. Contact Number and WhatsApp Strategy
**Question:** Which contact numbers can receive WhatsApp messages? Which number should be the primary contact method?

**Impact:** Determines notification routing, patient communication preference UI, and which number appears prominently on the website.

**Status:** ⏳ **UNRESOLVED** — Awaiting clinic confirmation

**Clinic Input Required:**
- Primary contact number: __________
  - [ ] Can receive WhatsApp
  - [ ] Phone calls only
  
- Secondary contact number: __________
  - [ ] Can receive WhatsApp
  - [ ] Phone calls only

**Communication Preference:**
- [ ] All patients should contact via primary number
- [ ] Patients should be offered choice between numbers
- [ ] Different branches have different primary numbers

---

### 6. Email Notification Routing
**Question:** Should clinic notification emails go to one email address or both?

**Impact:** Determines admin email configuration, notification rules, and accountability for appointment requests.

**Status:** ⏳ **UNRESOLVED** — Awaiting clinic confirmation

**Clinic Input Required:**
- Email address(es) for appointment notifications:
  1. __________ (Primary)
  2. __________ (Secondary, if applicable)

**Notification Preferences:**
- [ ] All notifications go to primary address only
- [ ] Notifications go to both addresses
- [ ] Branch-specific notifications (Ainapur → one address, Athani → another)
- [ ] Doctor-specific notifications (Dr. Ganiger → primary, others → secondary)

---

### 7. Admin Access and Account Creation
**Question:** Who should have admin access to manage appointments and clinic settings? How should the initial admin account be created securely?

**Impact:** Determines user roles, database permissions, account creation workflow, and security model.

**Status:** ⏳ **UNRESOLVED** — Awaiting clinic confirmation

**Clinic Input Required:**
- Primary admin: __________ (name/role)
- Secondary admin(s): __________ (if applicable)

**Account Creation Method:**
- [ ] Admin account created by developer (one-time setup, password provided securely)
- [ ] Admin account created via secure invitation link (one-time use)
- [ ] Other method: __________

**Admin Permissions:**
- [ ] View all appointments across both branches
- [ ] View branch-specific appointments only
- [ ] Create/edit clinic holidays and operating hours
- [ ] Manage other admin accounts
- [ ] Export appointment data

---

### 8. Patient Confirmation Email Expectations
**Question:** Should patients receive a confirmation email with appointment details, or only an acknowledgement that their request was received?

**Impact:** Determines email templates, database fields, and patient communication expectations. Affects no-show rates and legal compliance.

**Status:** ⏳ **UNRESOLVED** — Awaiting clinic confirmation

**Clinic Input Required:**
- [ ] **Confirmation Email:** "Your appointment is confirmed for [date/time at location]"
  - Include appointment ID/reference number
  - Include doctor name (if known)
  - Include location and directions
  - Include cancellation instructions
  
- [ ] **Acknowledgement Email Only:** "We received your request and will contact you within [X hours]"
  - No appointment date/time promised
  - Include clinic contact number
  - Include expected response timeframe

- [ ] **No Email:** Only SMS or phone confirmation from clinic staff

---

### 9. Language Support at Launch
**Question:** Should the website support English and Kannada from launch, or English-only initially?

**Impact:** Determines internationalization (i18n) setup, translation effort, content review process, and launch timeline.

**Status:** ✅ **CONFIRMED**

**Clinic Confirmation:**
- [ ] English only at launch
- [x] English and Kannada at launch
- [ ] English first, Kannada in Phase 2
- [ ] Other language(s): __________

**Details:** Website will support both English and Kannada languages at launch.

**Content Translation:**
- [ ] Clinic will provide Kannada translations
- [ ] Professional translator will be hired
- [ ] Timeline for Kannada translation: ________

---

### 10. Clinic Holiday Configuration
**Question:** Should clinic holidays (beyond weekly holidays) be configurable by an administrator, or will they be set by the developer?

**Impact:** Determines admin UI complexity, database schema, and flexibility for special closures (holidays, training days, emergencies).

**Status:** ✅ **CONFIRMED**

**Clinic Confirmation:**
- [x] Admin can add/edit/delete holidays without developer involvement
  - Holiday reasons (e.g., "Diwali", "Staff Training", "Temporary Closure")
  - Per-branch holidays or clinic-wide only
  - Recurring holidays or one-time only
  
- [ ] Holidays are set by developer and require code/deployment changes

- [ ] Hybrid: Recurring holidays are configured by admin; special closures require developer approval

**Details:** Clinic will manage national holidays and special closures via admin configuration (no developer involvement needed).

**Known Annual Holidays (for reference):**
- National holidays as per admin configuration

---

## Additional Context Required

### Branch Information
- **Ainapur Branch:** Address, phone, hours
- **Athani Branch:** Address, phone, hours
- Any other branches planned?

### Doctor/Specialist Information
- Dr. Ganiger's specialties: Prosthodontist & Oral Implantologist
- Other dentists/specialists at the clinic?
- Are appointments specific to a doctor, or can any patient see any available doctor?

### Clinic Policies
- No-show cancellation window (e.g., cancel 24 hours before)
- Any age restrictions (pediatric patients, senior patients)?
- First-time patient vs. returning patient workflows?
- Treatment packages or fixed-price services to display?

---

## Implementation Blockers

The following items **must be resolved before development begins:**

1. ✋ Appointment confirmation model (manual vs. auto)
2. ✋ Operating hours and holidays for both branches
3. ✋ Admin account creation method
4. ✋ Email notification routing
5. ✋ Patient communication preferences (WhatsApp, email, phone)

**All items marked ⏳ above must be answered before Code Generation Phase.**

---

## Next Steps

1. **Clinic Review:** Dr. Ganiger or designated staff reviews this specification
2. **Input Submission:** Provide answers to all 10 business rule questions
3. **Specification Finalization:** Update this document with confirmed decisions
4. **Architecture Design:** Create detailed system design based on clinic requirements
5. **Implementation:** Begin development with confirmed specifications

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 0.1 | 2026-10-28 | Initial specification with 10 unresolved business rule questions |
