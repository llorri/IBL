import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { serviceAreas } from "@/lib/services";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/format";

const stats = [
  { label: "Caregivers trained in CALM", value: "2,800+" },
  { label: "Counties served statewide", value: "14" },
  { label: "Clinical collaborators", value: "45" },
];

const workflow = [
  {
    title: "Listen & Stabilize",
    description: "Rapid-response intake, safety planning, and funding navigation within 48 hours.",
  },
  {
    title: "Design Personalized Roadmaps",
    description: "Clinicians co-create CALM scripts, coaching schedules, and service dashboards.",
  },
  {
    title: "Coach, Measure, & Evolve",
    description: "Onsite, community, and telehealth support with data loops for teams and funders.",
  },
];

export default async function HomePage() {
  const blogPosts = await prisma.blogPost.findMany({
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-12">
      <section className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-200">Institute for Behavior & Learning</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-5xl">
            Lifespan disability supports that honor family wisdom and clinical rigor.
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            We deliver CALM crisis management, behavior consultation, vocational coaching, and caregiver advocacy for individuals ages 3 to adulthood across California.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/intake">Start Intake</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/services">Explore Services</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/parents">Parent/Caregiver Portal</Link>
            </Button>
          </div>
          <dl className="mt-10 grid gap-6 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 px-4 py-4 text-center">
                <dt className="text-xs uppercase tracking-widest text-white/60">{stat.label}</dt>
                <dd className="mt-2 text-2xl font-semibold text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid gap-6">
          <div className="glass-panel p-6">
            <p className="text-sm text-cyan-200">Family Impact</p>
            <p className="mt-3 text-lg text-white/90">
              “The CALM team equipped our extended family and respite providers with shared language, rehearsal plans, and trauma-informed debriefs. We saw immediate safety improvements.”
            </p>
            <p className="mt-4 text-sm text-white/60">Parent of adolescent receiving CALM + Independent Living Skills</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {serviceAreas.slice(0, 4).map((service) => (
              <div key={service.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase text-cyan-200">{service.name}</p>
                <p className="mt-2 text-sm text-white/80">{service.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-8 rounded-[32px] border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-cyan-200">Service Blueprint</p>
            <h2 className="text-3xl font-semibold">Eight integrated service lines</h2>
            <p className="mt-2 text-slate-300">From CALM crisis response to vocational readiness, we architect whole-life supports.</p>
          </div>
          <Button asChild>
            <Link href="/services">See all services</Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {serviceAreas.slice(0, 4).map((service) => (
            <article key={service.id} className="glass-panel p-6">
              <h3 className="text-xl font-semibold text-white">{service.name}</h3>
              <p className="mt-2 text-sm text-cyan-200">{service.tagline}</p>
              <p className="mt-3 text-sm text-white/80">{service.description}</p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-white/70">
                {service.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-white/10 bg-white/5 p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-cyan-200">Care Pathway</p>
            <h2 className="text-3xl font-semibold">How we collaborate with families</h2>
          </div>
          <Button asChild variant="secondary">
            <Link href="/contact">Consult with clinical intake</Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {workflow.map((step, index) => (
            <div key={step.title} className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
              <p className="text-sm font-semibold text-cyan-200">Step {index + 1}</p>
              <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-white/80">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-white/10 bg-white/5 p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-cyan-200">News & Insights</p>
            <h2 className="text-3xl font-semibold">Stories from the field</h2>
          </div>
          <Button asChild>
            <Link href="/blog">View all posts</Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.slug} className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
              <p className="text-xs uppercase tracking-widest text-cyan-200">{formatDate(post.publishedAt)}</p>
              <h3 className="mt-2 text-xl font-semibold">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="mt-3 text-sm text-white/80">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="mt-4 inline-flex text-sm font-semibold text-cyan-200">
                Keep reading →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
