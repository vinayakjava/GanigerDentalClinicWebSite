"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

export function LanguageSwitch({
  current,
  label,
  description,
}: {
  current: Locale;
  label: string;
  description: string;
}) {
  const pathname = usePathname();
  const target: Locale = current === "en" ? "kn" : "en";
  const href = pathname.replace(/^\/(en|kn)(?=\/|$)/, `/${target}`);

  return (
    <Link
      href={href}
      hrefLang={target}
      className="inline-flex min-h-11 items-center rounded-md border border-line px-3 text-sm font-semibold text-navy-900 hover:bg-brand-50"
    >
      <span lang={target}>{label}</span>
      <span className="sr-only"> – {description}</span>
    </Link>
  );
}
