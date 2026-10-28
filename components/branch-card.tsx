import type { Dictionary } from "@/app/[lang]/dictionaries";
import { BRANCH_MAP_QUERIES, mapsHref, PRIMARY_PHONE, telHref, type BranchId } from "@/lib/clinic";
import { ClockIcon, MapPinIcon, PhoneIcon } from "./icons";

export function BranchCard({
  dict,
  branch,
  headingLevel = "h3",
}: {
  dict: Dictionary;
  branch: BranchId;
  headingLevel?: "h2" | "h3";
}) {
  const info = dict.branches[branch];
  const Heading = headingLevel;

  return (
    <article className="flex flex-col rounded-xl border border-line bg-white p-5 shadow-sm">
      <Heading className="text-xl font-bold text-navy-900">{info.name}</Heading>
      <div className="mt-3 space-y-3 text-ink">
        <p className="flex gap-3">
          <MapPinIcon className="mt-1 h-5 w-5 shrink-0 text-brand-600" />
          <span>{info.address}</span>
        </p>
        <p className="flex gap-3">
          <ClockIcon className="mt-1 h-5 w-5 shrink-0 text-brand-600" />
          <span>
            <span className="block font-semibold">{info.hours}</span>
            <span className="block text-muted">{info.days}</span>
          </span>
        </p>
      </div>
      <div className="mt-auto flex flex-wrap gap-2 pt-4">
        <a
          href={telHref(PRIMARY_PHONE)}
          className="inline-flex min-h-11 items-center gap-2 rounded-md bg-brand-50 px-3 font-semibold text-navy-900 hover:bg-brand-100"
        >
          <PhoneIcon className="h-4 w-4" />
          {dict.actions.call}
        </a>
        <a
          href={mapsHref(BRANCH_MAP_QUERIES[branch])}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-md bg-brand-50 px-3 font-semibold text-navy-900 hover:bg-brand-100"
        >
          <MapPinIcon className="h-4 w-4" />
          {dict.actions.directions}
          <span className="sr-only"> {dict.actions.opensInNewTab}</span>
        </a>
      </div>
    </article>
  );
}
