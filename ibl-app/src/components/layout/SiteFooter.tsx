import Link from "next/link";

const columns = [
  {
    title: "Programs",
    links: [
      { label: "CALM Crisis", href: "/services#calm" },
      { label: "Vocational", href: "/services#vocational" },
      { label: "Independent Living", href: "/services#independent-living" },
    ],
  },
  {
    title: "Engage",
    links: [
      { label: "Intake", href: "/intake" },
      { label: "Contact", href: "/contact" },
      { label: "Caregiver Portal", href: "/parents" },
    ],
  },
  {
    title: "Staff",
    links: [
      { label: "Schedule", href: "/staff/portal" },
      { label: "Newsroom", href: "/blog" },
      { label: "Login", href: "/staff/login" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <p className="text-lg font-semibold">Institute for Behavior & Learning</p>
          <p className="mt-3 text-sm text-white/70">
            Compassionate clinicians, educators, and advocates delivering integrated support for individuals ages 3 through adulthood.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-sm font-semibold uppercase text-white/60">{column.title}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link className="text-white/80 hover:text-cyan-300" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Institute for Behavior & Learning. All rights reserved.
      </div>
    </footer>
  );
}
