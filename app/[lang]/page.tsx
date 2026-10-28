import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BranchCard } from "@/components/branch-card";
import { ContactButtons } from "@/components/contact-buttons";
import { ShieldCheckIcon, ToothIcon } from "@/components/icons";
import { BRANCH_IDS, CLINIC_SINCE, FEATURED_SERVICES, KPME_REG_NO, KSDC_REG_NO, PATIENTS_TREATED } from "@/lib/clinic";
import { alternates, localePath } from "@/lib/site";
import { getDictionary, getLocale } from "./dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: { absolute: dict.meta.homeTitle },
    description: dict.meta.homeDescription,
    alternates: alternates(await getLocale()),
  };
}

export default async function HomePage() {
  const dict = await getDictionary();
  const locale = await getLocale();

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-700 text-white">
        {/* Decorative watermark; the header already shows the logo with alt text. */}
        <Image
          src="/images/clinic-logo.jpg"
          alt=""
          width={512}
          height={512}
          sizes="(min-width: 768px) 640px, 120vw"
          className="pointer-events-none absolute top-1/2 -left-1/4 w-[120vw] max-w-none -translate-y-1/2 rounded-full opacity-[0.07] md:-left-32 md:w-[40rem]"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr] md:py-20">
          <div>
            <p className="font-semibold uppercase tracking-wider text-accent-500">{dict.clinic.tagline}</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{dict.clinic.name}</h1>
            <p className="mt-4 text-lg text-white/90">{dict.home.intro}</p>
            <p className="mt-4 text-white/90">
              <span className="font-semibold text-white">{dict.doctor.name}</span>, {dict.doctor.qualifications}
              <br />
              {dict.doctor.designation}
            </p>
            <ul className="mt-4 inline-flex flex-col gap-3 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white/90">
              {[
                { text: dict.home.ksdc, regNo: KSDC_REG_NO },
                { text: dict.home.kpme, regNo: KPME_REG_NO },
              ].map((item) => (
                <li key={item.regNo} className="flex items-start gap-2">
                  <ShieldCheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
                  <span>
                    {item.text}
                    <br />
                    {dict.home.regNoLabel}:{" "}
                    <span className="font-semibold tracking-wide text-white">{item.regNo}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={localePath(locale, "/contact")}
                className="inline-flex min-h-12 items-center rounded-lg bg-accent-500 px-6 text-lg font-bold text-navy-950 hover:bg-accent-500/90"
              >
                {dict.actions.requestAppointment}
              </Link>
            </div>
          </div>
          <div className="mx-auto w-full max-w-sm">
            <Image
              src="/images/dr-ganiger-home-hero.jpg"
              alt={dict.doctor.photoAlt}
              width={1086}
              height={1448}
              priority
              sizes="(min-width: 768px) 384px, 90vw"
              className="aspect-[3/4] w-full rounded-2xl border-4 border-white/20 object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section aria-label={dict.home.statsLabel} className="border-b border-line bg-white">
        <dl className="mx-auto grid max-w-3xl grid-cols-2 divide-x divide-line px-4 py-8 text-center sm:px-6">
          {[
            { label: dict.home.patientsLabel, value: PATIENTS_TREATED },
            { label: dict.home.sinceLabel, value: CLINIC_SINCE },
          ].map((stat) => (
            <div key={stat.label} className="px-2">
              <dt className="text-sm font-semibold text-muted sm:text-base">{stat.label}</dt>
              <dd className="mt-1 text-3xl font-bold text-navy-900 sm:text-4xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="branches-heading" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 id="branches-heading" className="text-2xl font-bold text-navy-900 sm:text-3xl">
          {dict.home.branchesHeading}
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {BRANCH_IDS.map((id) => (
            <BranchCard key={id} dict={dict} branch={id} />
          ))}
        </div>
      </section>

      <section aria-labelledby="services-heading" className="bg-brand-50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h2 id="services-heading" className="text-2xl font-bold text-navy-900 sm:text-3xl">
            {dict.home.servicesHeading}
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_SERVICES.map((id) => (
              <li key={id} className="flex items-center gap-3 rounded-xl bg-white p-4 font-semibold text-navy-900 shadow-sm">
                <ToothIcon className="h-6 w-6 shrink-0 text-accent-500" />
                {dict.serviceNames[id]}
              </li>
            ))}
          </ul>
          <Link
            href={localePath(locale, "/services")}
            className="mt-6 inline-flex min-h-11 items-center font-semibold text-brand-600 underline underline-offset-4 hover:text-navy-900"
          >
            {dict.actions.viewAllServices} →
          </Link>
        </div>
      </section>

      <section
        aria-labelledby="doctor-heading"
        className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-[minmax(0,320px)_1fr] md:gap-12"
      >
        <Image
          src="/images/dr-ganiger-treatment-room.jpg"
          alt={dict.doctor.treatmentRoomAlt}
          width={1200}
          height={1600}
          sizes="(min-width: 768px) 320px, 90vw"
          className="mx-auto w-full max-w-xs rounded-2xl shadow-lg md:max-w-none"
        />
        <div>
          <h2 id="doctor-heading" className="text-2xl font-bold text-navy-900 sm:text-3xl">
            {dict.home.doctorHeading}
          </h2>
          <p className="mt-4 max-w-3xl text-lg">{dict.doctor.bio}</p>
          <Link
            href={localePath(locale, "/about")}
            className="mt-4 inline-flex min-h-11 items-center font-semibold text-brand-600 underline underline-offset-4 hover:text-navy-900"
          >
            {dict.actions.aboutDoctor} →
          </Link>
        </div>
      </section>

      <section aria-labelledby="cta-heading" className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl bg-accent-100 p-6 sm:p-10">
          <h2 id="cta-heading" className="text-2xl font-bold text-navy-900">
            {dict.home.ctaHeading}
          </h2>
          <p className="mt-2 max-w-2xl">{dict.home.ctaBody}</p>
          <ContactButtons dict={dict} className="mt-6" />
        </div>
      </section>
    </>
  );
}
