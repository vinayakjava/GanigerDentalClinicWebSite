import { notFound } from "next/navigation";

// Unmatched URLs never reach app/[lang]/not-found.tsx on their own, because the root layout lives under [lang].
export default function MissingPage() {
  notFound();
}
