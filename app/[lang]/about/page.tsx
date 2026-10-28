import type { Metadata } from "next";
import Image from "next/image";
import { ContactButtons } from "@/components/contact-buttons";
import { CONFERENCES, EDUCATION, PUBLICATIONS } from "@/lib/doctor";
import { alternates } from "@/lib/site";
import { getDictionary, getLocale } from "../dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.meta.aboutTitle,
    description: dict.meta.aboutDescription,
    alternates: alternates(await getLocale(), "/about"),
  };
}

export default async function AboutPage() {
  const dict = await getDictionary();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-navy-900 sm:text-4xl">{dict.about.heading}</h1>
      <div className="mt-8 grid gap-10 md:grid-cols-[minmax(0,320px)_1fr]">
        <Image
          src="/images/dr-ganiger-portrait.jpg"
          alt={dict.doctor.photoAlt}
          width={1200}
          height={1600}
          sizes="(min-width: 768px) 320px, 90vw"
          className="w-full max-w-xs rounded-2xl shadow-lg md:max-w-none"
        />
        <div>
          <h2 className="text-2xl font-bold text-navy-900">{dict.doctor.name}</h2>
          <p className="mt-1 font-semibold text-brand-600">{dict.doctor.qualifications}</p>
          <p className="text-muted">{dict.doctor.designation}</p>
          <p className="mt-6 text-lg">{dict.doctor.bio}</p>

          <h2 className="mt-8 text-xl font-bold text-navy-900">{dict.about.specialisationsHeading}</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {dict.about.specialisations.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full bg-accent-500" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-8">{dict.about.ctaBody}</p>
          <ContactButtons dict={dict} className="mt-4" />
        </div>
      </div>

      <section aria-labelledby="education-heading" className="mt-12">
        <h2 id="education-heading" className="text-2xl font-bold text-navy-900">
          {dict.about.educationHeading}
        </h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-2">
          {EDUCATION.map((item) => (
            <li key={item.id} className="rounded-xl border border-line bg-white p-5 shadow-sm">
              <h3 className="font-bold text-navy-900">{dict.about.qualifications[item.id]}</h3>
              <p className="mt-1" lang="en">
                {item.institution}
              </p>
              <p className="mt-2 text-sm text-muted">
                {dict.about.yearLabel}: <span className="font-semibold text-navy-900">{item.years}</span>
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="experience-heading" className="mt-12">
        <h2 id="experience-heading" className="text-2xl font-bold text-navy-900">
          {dict.about.experienceHeading}
        </h2>
        <h3 className="mt-4 font-semibold text-brand-600">{dict.about.experienceSubheading}</h3>
        <ul className="mt-3 grid gap-2 md:grid-cols-2">
          {dict.about.experience.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-accent-500" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="conferences-heading" className="mt-12">
        <h2 id="conferences-heading" className="text-2xl font-bold text-navy-900">
          {dict.about.conferencesHeading}
        </h2>
        <ul className="mt-6 space-y-4">
          {CONFERENCES.map((item) => (
            <li key={item.event} className="border-l-4 border-accent-500 pl-4">
              <p className="font-semibold text-navy-900" lang="en">
                {item.event} ({item.year})
              </p>
              <p className="mt-1">
                {dict.about.presentationKinds[item.kind]}: <span lang="en">“{item.title}”</span>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="publications-heading" className="mt-12">
        <h2 id="publications-heading" className="text-2xl font-bold text-navy-900">
          {dict.about.publicationsHeading}
        </h2>
        <ul className="mt-6 space-y-3" lang="en">
          {PUBLICATIONS.map((item) => (
            <li key={item.title} className="flex gap-2">
              <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-accent-500" aria-hidden="true" />
              <span>
                “{item.title}”
                {"journal" in item && (
                  <span className="text-muted">
                    {" "}
                    – {item.journal}
                    {"year" in item && `, ${item.year}`}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="gallery-heading" className="mt-12">
        <h2 id="gallery-heading" className="text-2xl font-bold text-navy-900">
          {dict.about.galleryHeading}
        </h2>
        <ul className="mt-6 grid max-w-4xl gap-6 sm:grid-cols-2">
          {[
            { src: "/images/dr-ganiger-treatment-room.jpg", alt: dict.doctor.treatmentRoomAlt },
            { src: "/images/dr-ganiger-consultation-desk.jpg", alt: dict.doctor.deskAlt },
          ].map((photo) => (
            <li key={photo.src}>
              <Image
                src={photo.src}
                alt={photo.alt}
                width={1200}
                height={1600}
                sizes="(min-width: 896px) 436px, (min-width: 640px) 45vw, 90vw"
                className="w-full rounded-2xl shadow-lg"
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
