import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1] ?? "";
  if (isLocale(firstSegment)) return;

  const prefersKannada = request.headers
    .get("accept-language")
    ?.toLowerCase()
    .startsWith("kn");
  const locale = prefersKannada ? "kn" : DEFAULT_LOCALE;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, public files, and metadata routes; every other path gets a locale.
  matcher: ["/((?!_next/static|_next/image|images/|icon.png|apple-icon.png|sitemap.xml|robots.txt).*)"],
};
