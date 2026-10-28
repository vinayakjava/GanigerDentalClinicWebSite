import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/i18n";
import { localePath, siteUrl } from "@/lib/site";

const PATHS = ["", "/about", "/services", "/contact", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return PATHS.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: new URL(localePath(locale, path), base).toString(),
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((alt) => [alt, new URL(localePath(alt, path), base).toString()]),
        ),
      },
    })),
  );
}
