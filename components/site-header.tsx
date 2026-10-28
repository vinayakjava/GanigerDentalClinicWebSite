import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/site";
import { LanguageSwitch } from "./language-switch";
import { MenuIcon } from "./icons";
import { NavLinks } from "./nav-links";

export function SiteHeader({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const items = [
    { href: localePath(locale), label: dict.nav.home },
    { href: localePath(locale, "/about"), label: dict.nav.about },
    { href: localePath(locale, "/services"), label: dict.nav.services },
    { href: localePath(locale, "/contact"), label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 sm:px-6">
        <Link href={localePath(locale)} className="flex min-w-0 items-center gap-3">
          <Image
            src="/images/clinic-logo.jpg"
            alt={dict.clinic.logoAlt}
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 rounded-full"
            priority
          />
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-lg font-bold text-navy-900">{dict.clinic.shortName}</span>
            <span className="hidden truncate text-xs text-muted sm:block">{dict.clinic.subName}</span>
          </span>
        </Link>

        <nav aria-label={dict.nav.primary} className="hidden lg:block">
          <NavLinks items={items} className="flex items-center gap-1" />
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitch
            current={locale}
            label={dict.nav.switchLanguage}
            description={dict.nav.switchLanguageLabel}
          />
          <details className="group relative lg:hidden">
            <summary className="flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center rounded-md border border-line text-navy-900 hover:bg-brand-50 [&::-webkit-details-marker]:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">{dict.nav.menu}</span>
            </summary>
            <nav
              aria-label={dict.nav.primary}
              className="absolute right-0 mt-2 w-60 rounded-lg border border-line bg-white p-2 shadow-lg"
            >
              <NavLinks items={items} className="flex flex-col gap-1" />
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
