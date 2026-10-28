import type { Locale } from "./i18n";

export function siteUrl(): URL {
  return new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");
}

export function localePath(locale: Locale, path: string = ""): string {
  return `/${locale}${path}`;
}

export function alternates(locale: Locale, path: string = "") {
  return {
    canonical: localePath(locale, path),
    languages: { en: localePath("en", path), kn: localePath("kn", path) },
  };
}
