import type { Metadata, Viewport } from "next";
import { Noto_Sans, Noto_Sans_Kannada } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { LOCALES } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";
import { getDictionary, getLocale } from "./dictionaries";
import "../globals.css";

const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-noto-sans", display: "swap" });
const notoSansKannada = Noto_Sans_Kannada({
  subsets: ["kannada"],
  variable: "--font-noto-sans-kannada",
  display: "swap",
});

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    metadataBase: siteUrl(),
    title: { default: dict.meta.homeTitle, template: `%s | ${dict.meta.siteName}` },
    description: dict.meta.homeDescription,
    openGraph: { siteName: dict.meta.siteName, type: "website", images: ["/images/clinic-logo.jpg"] },
  };
}

export const viewport: Viewport = { themeColor: "#0b1f4b" };

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  const dict = await getDictionary();

  return (
    <html lang={locale} className={`${notoSans.variable} ${notoSansKannada.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-navy-900"
        >
          {dict.nav.skipToContent}
        </a>
        <SiteHeader dict={dict} locale={locale} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter dict={dict} locale={locale} />
      </body>
    </html>
  );
}
