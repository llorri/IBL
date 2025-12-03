import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { calmPillars, impactStats, serviceAreas, values } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";

export default async function Home() {
  const blogPosts = await prisma.blogPost.findMany({
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  return (
    <div className="space-y-20 pb-20">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-indigo-50 via-white to-slate-50">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.15),_transparent_55%)]" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-20 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">Institute for Behavior and Learning</p>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
              Crisis-ready, dignity-centered disability supports for families and provider teams.
            </h1>
            <p className="text-lg text-slate-600 md:max-w-2xl">
              We design CALM crisis management, advocacy, adaptive skill training, and independent living programs for
              individuals ages 3 through adulthood. Services are available across homes, schools, community sites, and
              provider agencies.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/intake"
                className="rounded-full bg-indigo-600 px-6 py-3 text-center font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-500"
              >
                Start Intake
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-slate-300 px-6 py-3 text-center font-semibold text-slate-800 transition hover:border-slate-400"
              >
                Explore Services
              </Link>
            </div>
            <dl className="grid gap-6 sm:grid-cols-3">
              {impactStats.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.label}</dt>
                  <dd className="mt-1 text-2xl font-semibold text-slate-900">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex-1 space-y-4 rounded-3xl border border-slate-100 bg-white/80 p-8 shadow-xl shadow-indigo-100 backdrop-blur">
            <p className="text-sm font-semibold text-indigo-600">CALM Program Snapshot</p>
            <ul className="space-y-4 text-sm text-slate-600">
              {calmPillars.map((pillar) => (
                <li key={pillar.name} className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                  <p className="font-semibold text-slate-900">{pillar.name}</p>
                  <p className="mt-1 text-slate-600">{pillar.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-4">
        <SectionHeading
          eyebrow="CALM + Beyond"
          heading="Services that move with families from crisis to long-term independence."
          description="Eight coordinated service lines ensure caregivers, provider agencies, and individuals never have to restart their story."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {serviceAreas.slice(0, 4).map((service) => (
            <div key={service.title} className="card">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-900">{service.title}</h3>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">{service.audience}</span>
              </div>
              <p className="mt-3 text-sm text-slate-600">{service.summary}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {service.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/services" className="text-sm font-semibold text-indigo-600">
            View all eight service areas →
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <SectionHeading
            eyebrow="Parent & Caregiver Portal"
            heading="Manuals, worksheets, and coaching videos ready when a team needs them."
            description="Families can download CALM safety plans, regulation menus, and coordination tools at any time."
          />
          <ul className="space-y-4 text-sm text-slate-600">
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
              Printable manuals in English and Spanish
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
              Worksheets for regulation, vocational readiness, and independent living
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
              Secure upload for signed documents and goal updates
            </li>
          </ul>
          <Link
            href="/parent-portal"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600"
          >
            Enter the Parent/Caregiver Portal →
          </Link>
        </div>
        <div className="card space-y-4 bg-slate-900 text-white">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Workflow</p>
          <p className="text-2xl font-semibold">Intake → Coaching → Transition</p>
          <p className="text-sm text-slate-200">
            Every referral receives a single point of contact, multi-agency collaboration support, and transition
            planning before discharge.
          </p>
          <div className="grid gap-3 text-sm">
            {values.map((value) => (
              <div key={value.title} className="rounded-2xl bg-white/10 p-4">
                <p className="font-semibold">{value.title}</p>
                <p className="mt-1 text-slate-200">{value.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-4">
        <SectionHeading
          eyebrow="Insights"
          heading="News + practice notes from the IBL team."
          description="Stories and resources for educators, providers, and caregivers."
          align="center"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.id} className="card flex flex-col gap-3">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                {new Date(post.publishedAt).toLocaleDateString()}
              </p>
              <h3 className="text-xl font-semibold text-slate-900">{post.title}</h3>
              <p className="text-sm text-slate-600">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-indigo-600">
                Read article →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white/90 px-6 py-12 text-center shadow-lg shadow-slate-200">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Ready when you are</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900">Schedule a consult or submit an intake today.</h2>
        <p className="mt-3 text-base text-slate-600">
          We partner with regional centers, SELPAs, school districts, and private families. Same-week consults are
          available for urgent CALM requests.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="mailto:intake@ibl.org"
            className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800"
          >
            Email intake@ibl.org
          </Link>
          <Link
            href="/contact"
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
          >
            Contact our team
          </Link>
        </div>
      </section>
    </div>
  );
}
