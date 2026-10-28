import type { Metadata } from "next";
import { AppointmentForm } from "@/components/appointment-form";
import { BranchCard } from "@/components/branch-card";
import { ChatIcon, MailIcon, PhoneIcon } from "@/components/icons";
import {
  BRANCH_IDS,
  CLINIC_EMAIL,
  PRIMARY_PHONE,
  SECONDARY_PHONE,
  telHref,
  WHATSAPP_PHONE,
  whatsappHref,
} from "@/lib/clinic";
import { alternates } from "@/lib/site";
import { getDictionary, getLocale } from "../dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.meta.contactTitle,
    description: dict.meta.contactDescription,
    alternates: alternates(await getLocale(), "/contact"),
  };
}

const linkClass = "font-semibold text-brand-600 underline underline-offset-4 hover:text-navy-900";

export default async function ContactPage() {
  const dict = await getDictionary();
  const locale = await getLocale();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-navy-900 sm:text-4xl">{dict.contact.heading}</h1>
      <p className="mt-4 max-w-3xl text-lg">{dict.contact.intro}</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-6">
          <section aria-labelledby="direct-heading" className="rounded-xl border border-line p-5">
            <h2 id="direct-heading" className="text-xl font-bold text-navy-900">
              {dict.contact.directHeading}
            </h2>
            <ul className="mt-3 space-y-3">
              <li className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5 shrink-0 text-brand-600" />
                <span>
                  {dict.contact.phonesLabel}:{" "}
                  <a className={linkClass} href={telHref(PRIMARY_PHONE)}>
                    {PRIMARY_PHONE}
                  </a>
                  ,{" "}
                  <a className={linkClass} href={telHref(SECONDARY_PHONE)}>
                    {SECONDARY_PHONE}
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <ChatIcon className="h-5 w-5 shrink-0 text-brand-600" />
                <span>
                  {dict.contact.whatsappLabel}:{" "}
                  <a className={linkClass} href={whatsappHref()} target="_blank" rel="noopener noreferrer">
                    {WHATSAPP_PHONE}
                    <span className="sr-only"> {dict.actions.opensInNewTab}</span>
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <MailIcon className="h-5 w-5 shrink-0 text-brand-600" />
                <span className="break-all">
                  {dict.contact.emailLabel}:{" "}
                  <a className={linkClass} href={`mailto:${CLINIC_EMAIL}`}>
                    {CLINIC_EMAIL}
                  </a>
                </span>
              </li>
            </ul>
          </section>
          {BRANCH_IDS.map((id) => (
            <BranchCard key={id} dict={dict} branch={id} headingLevel="h2" />
          ))}
        </div>

        <section aria-labelledby="form-heading" className="rounded-2xl bg-brand-50 p-5 sm:p-8">
          <h2 id="form-heading" className="text-2xl font-bold text-navy-900">
            {dict.contact.formHeading}
          </h2>
          <p className="mt-2 mb-6 font-medium text-navy-700">{dict.contact.formIntro}</p>
          <AppointmentForm
            labels={dict.form}
            branchNames={{ athani: dict.branches.athani.name, ainapur: dict.branches.ainapur.name }}
            callLabel={dict.actions.call}
            locale={locale}
          />
        </section>
      </div>
    </div>
  );
}
