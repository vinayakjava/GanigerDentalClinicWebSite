import Link from "next/link";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { BRANCH_IDS, CLINIC_EMAIL, PRIMARY_PHONE, SECONDARY_PHONE, telHref } from "@/lib/clinic";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/site";

export function SiteFooter({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <footer className="mt-16 bg-navy-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold">{dict.clinic.name}</p>
          <p className="mt-2 text-sm text-white/80">
            {dict.doctor.name}, {dict.doctor.qualifications}
            <br />
            {dict.doctor.designation}
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-accent-500">{dict.footer.branchesHeading}</h2>
          <ul className="mt-2 space-y-3 text-sm text-white/85">
            {BRANCH_IDS.map((id) => (
              <li key={id}>
                <span className="block font-semibold text-white">{dict.branches[id].name}</span>
                {dict.branches[id].hours} · {dict.branches[id].days}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-accent-500">{dict.footer.contactHeading}</h2>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <a className="underline-offset-4 hover:underline" href={telHref(PRIMARY_PHONE)}>{PRIMARY_PHONE}</a>
              {", "}
              <a className="underline-offset-4 hover:underline" href={telHref(SECONDARY_PHONE)}>{SECONDARY_PHONE}</a>
            </li>
            <li>
              <a className="underline-offset-4 hover:underline" href={`mailto:${CLINIC_EMAIL}`}>{CLINIC_EMAIL}</a>
            </li>
            <li>
              <Link className="underline-offset-4 hover:underline" href={localePath(locale, "/privacy")}>
                {dict.nav.privacy}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="border-t border-white/15 px-4 py-4 text-center text-xs text-white/70">
        © {dict.clinic.name}. {dict.footer.rights}
      </p>
    </footer>
  );
}
