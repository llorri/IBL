"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/intake", label: "Intake" },
  { href: "/parent-portal", label: "Parent Portal" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-slate-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-semibold text-slate-900 text-lg">
          Institute for Behavior & Learning
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition hover:text-indigo-600 ${
                pathname === link.href ? "text-indigo-600" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/staff/login"
            className="rounded-full bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
          >
            Staff Portal
          </Link>
        </nav>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300"
          aria-label="Toggle navigation"
        >
          <span className="sr-only">Toggle navigation</span>
          <div className="space-y-1">
            <span className="block h-0.5 w-6 bg-slate-900" />
            <span className="block h-0.5 w-6 bg-slate-900" />
            <span className="block h-0.5 w-6 bg-slate-900" />
          </div>
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium ${
                  pathname === link.href ? "text-indigo-600" : "text-slate-700"
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/staff/login"
              className="rounded-full bg-slate-900 px-4 py-2 text-center text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Staff Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
