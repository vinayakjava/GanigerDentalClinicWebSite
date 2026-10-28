"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string };

export function NavLinks({ items, className }: { items: NavItem[]; className?: string }) {
  const pathname = usePathname();
  return (
    <ul className={className}>
      {items.map((item) => {
        const current = pathname === item.href;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={current ? "page" : undefined}
              onClick={(event) => event.currentTarget.closest("details")?.removeAttribute("open")}
              className={`block rounded-md px-3 py-2 font-medium transition-colors hover:bg-brand-100 hover:text-navy-900 ${
                current ? "bg-brand-100 text-navy-900" : "text-ink"
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
