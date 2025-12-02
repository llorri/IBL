"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/intake", label: "Intake" },
  { href: "/parents", label: "Parent Portal" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "News" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="backdrop-blur border-b border-white/10 bg-slate-950/70 text-white sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-semibold tracking-tight text-lg">
          Institute for Behavior & Learning
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-cyan-300 transition">
              {link.label}
            </Link>
          ))}
          <Link
            href="/staff/login"
            className="rounded-full bg-cyan-400 px-4 py-2 text-slate-900 font-semibold"
          >
            Staff Login
          </Link>
        </nav>
        <button
          className="md:hidden rounded-full border border-white/30 p-2"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <span className="sr-only">Toggle menu</span>
          <div className="h-0.5 w-6 bg-white mb-1" />
          <div className="h-0.5 w-6 bg-white mb-1" />
          <div className="h-0.5 w-6 bg-white" />
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-slate-950/90">
          <nav className="flex flex-col px-4 py-3 gap-4 text-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/90"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/staff/login"
              onClick={() => setMobileOpen(false)}
              className="rounded-full bg-cyan-400 px-4 py-2 text-center font-semibold text-slate-900"
            >
              Staff Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
