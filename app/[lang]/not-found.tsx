import Link from "next/link";
import { getDictionary, getLocale } from "./dictionaries";
import { localePath } from "@/lib/site";

export default async function NotFound() {
  const dict = await getDictionary();
  const locale = await getLocale();
  return (
    <section className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-navy-900">{dict.notFound.heading}</h1>
      <p className="mt-3 text-muted">{dict.notFound.body}</p>
      <Link
        href={localePath(locale)}
        className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-navy-900 px-5 font-semibold text-white hover:bg-navy-700"
      >
        {dict.notFound.home}
      </Link>
    </section>
  );
}
