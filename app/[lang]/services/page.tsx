import type { Metadata } from "next";
import Link from "next/link";
import { ContactButtons } from "@/components/contact-buttons";
import { ToothIcon } from "@/components/icons";
import { SERVICE_IDS } from "@/lib/clinic";
import { alternates, localePath } from "@/lib/site";
import { getDictionary, getLocale } from "../dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.meta.servicesTitle,
    description: dict.meta.servicesDescription,
    alternates: alternates(await getLocale(), "/services"),
  };
}

export default async function ServicesPage() {
  const dict = await getDictionary();
  const locale = await getLocale();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-navy-900 sm:text-4xl">{dict.services.heading}</h1>
      <p className="mt-4 max-w-3xl text-lg">{dict.services.intro}</p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICE_IDS.map((id) => (
          <li key={id} className="flex items-start gap-3 rounded-xl border border-line bg-white p-4 shadow-sm">
            <ToothIcon className="mt-0.5 h-6 w-6 shrink-0 text-accent-500" />
            <span className="font-semibold text-navy-900">{dict.serviceNames[id]}</span>
          </li>
        ))}
      </ul>
      <div className="mt-10 rounded-2xl bg-brand-50 p-6">
        <p>{dict.home.ctaBody}</p>
        <ContactButtons dict={dict} className="mt-4" />
        <Link
          href={localePath(locale, "/contact")}
          className="mt-4 inline-flex min-h-11 items-center font-semibold text-brand-600 underline underline-offset-4 hover:text-navy-900"
        >
          {dict.actions.requestAppointment} →
        </Link>
      </div>
    </div>
  );
}
