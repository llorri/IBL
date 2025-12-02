import Link from "next/link";

const footerLinks = [
  {
    title: "Explore",
    items: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Blog & News", href: "/blog" },
    ],
  },
  {
    title: "Programs",
    items: [
      { label: "CALM", href: "/services#calm" },
      { label: "Parent Support", href: "/services#parent" },
      { label: "Vocational", href: "/services#vocational" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-semibold text-slate-900">Institute for Behavior and Learning</p>
          <p className="mt-3 text-sm text-slate-600">
            Comprehensive behavior, advocacy, and independent living supports for individuals ages 3 through
            adulthood. We partner with families, schools, regional centers, and provider agencies across Southern
            California.
          </p>
          <p className="mt-4 text-sm text-slate-600">
            Phone: <a className="text-indigo-600" href="tel:15555551234">(555) 555-1234</a> · Email: {" "}
            <a className="text-indigo-600" href="mailto:intake@ibl.org">
              intake@ibl.org
            </a>
          </p>
        </div>
        {footerLinks.map((column) => (
          <div key={column.title}>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{column.title}</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {column.items.map((item) => (
                <li key={item.label}>
                  <Link className="transition hover:text-indigo-600" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Institute for Behavior and Learning. All rights reserved.
      </div>
    </footer>
  );
}
