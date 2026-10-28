import type { Metadata } from "next";
import Image from "next/image";
import { ContactButtons } from "@/components/contact-buttons";
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
