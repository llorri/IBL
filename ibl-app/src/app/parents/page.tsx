import { caregiverResources } from "@/lib/resources";
import Link from "next/link";

const supports = [
  {
    title: "CALM Coaching Videos",
    description: "Micro-trainings covering co-regulation, prompting, and safe holds alternatives.",
  },
  {
    title: "Advocacy Office Hours",
    description: "Weekly virtual drop-ins with education and regional center specialists.",
  },
  {
    title: "Family Respite Collective",
    description: "Peer-led circles for short-term relief strategies and mutual aid.",
  },
];

export default function ParentsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <header className="space-y-4 text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-200">Parent & Caregiver Portal</p>
        <h1 className="text-4xl font-semibold">Manuals, worksheets, and live support</h1>
        <p className="text-lg text-slate-200">
          Downloads and programming designed for parents, caregivers, and direct support staff implementing CALM and related services.
        </p>
      </header>
      <section className="mt-10 grid gap-6 md:grid-cols-2">
        {caregiverResources.map((resource) => (
          <article key={resource.id} className="glass-panel p-6">
            <h2 className="text-xl font-semibold">{resource.title}</h2>
            <p className="mt-2 text-sm text-white/80">{resource.description}</p>
            <Link
              href={resource.file}
              download
              className="mt-4 inline-flex items-center text-sm font-semibold text-cyan-200"
            >
              Download resource →
            </Link>
          </article>
        ))}
      </section>
      <section className="mt-12 grid gap-6 md:grid-cols-3">
        {supports.map((support) => (
          <div key={support.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold">{support.title}</h3>
            <p className="mt-2 text-sm text-white/80">{support.description}</p>
          </div>
        ))}
      </section>
      <p className="mt-8 text-center text-sm text-white/70">
        Need a custom worksheet translated or adapted? Email <a className="text-cyan-200" href="mailto:caregivers@ibl.org">caregivers@ibl.org</a>.
      </p>
    </div>
  );
}
