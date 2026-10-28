import type { Metadata } from "next";
import { alternates } from "@/lib/site";
import { getDictionary, getLocale } from "../dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.meta.termsTitle,
    description: dict.meta.termsDescription,
    alternates: alternates(await getLocale(), "/terms"),
  };
}

export default async function TermsPage() {
  const dict = await getDictionary();
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-navy-900 sm:text-4xl">{dict.terms.heading}</h1>
      {dict.terms.sections.map((section) => (
        <section key={section.heading} className="mt-8">
          <h2 className="text-xl font-bold text-navy-900">{section.heading}</h2>
          <p className="mt-2">{section.body}</p>
        </section>
      ))}
    </article>
  );
}
