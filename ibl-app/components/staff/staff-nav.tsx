"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/staff/dashboard", label: "Dashboard" },
  { href: "/staff/schedule", label: "Schedules" },
  { href: "/staff/case-notes", label: "Case Notes" },
];

export function StaffNav() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-wrap gap-2 text-sm font-semibold">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-full px-4 py-2 ${
              active ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"
            } transition`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
