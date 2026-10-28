import type { Dictionary } from "@/app/[lang]/dictionaries";
import { PRIMARY_PHONE, telHref, whatsappHref } from "@/lib/clinic";
import { ChatIcon, PhoneIcon } from "./icons";

export function ContactButtons({ dict, className = "" }: { dict: Dictionary; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a
        href={telHref(PRIMARY_PHONE)}
        className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-navy-900 px-5 font-semibold text-white hover:bg-navy-700"
      >
        <PhoneIcon />
        {dict.actions.call} {PRIMARY_PHONE}
      </a>
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-12 items-center gap-2 rounded-lg border-2 border-navy-900 bg-white px-5 font-semibold text-navy-900 hover:bg-brand-50"
      >
        <ChatIcon />
        {dict.actions.whatsapp}
        <span className="sr-only"> {dict.actions.opensInNewTab}</span>
      </a>
    </div>
  );
}
