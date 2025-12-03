import { SectionHeading } from "@/components/section-heading";
import { impactStats, values } from "@/lib/content";

const leadership = [
  {
    name: "Jordan Winters, BCBA",
    role: "Clinical Director",
    focus: "CALM creator and complex behavior consultation lead",
  },
  {
    name: "Maya Chen, MSW",
    role: "Director of Integrative Services",
    focus: "Family advocacy, IPP/IEP alignment, and systems partnerships",
  },
  {
    name: "Luis Ortega, M.Ed",
    role: "Director of Transition & Employment",
    focus: "Vocational, independent living, and community inclusion programs",
  },
];

const milestones = [
  {
    year: "2006",
    detail: "Institute for Behavior and Learning launched CALM with a pilot of 25 families in San Diego County.",
  },
  {
    year: "2012",
    detail: "Expanded to community inclusion and vocational teams serving regional center-funded adults.",
  },
  {
    year: "2018",
    detail: "Added in-house advocacy and transition facilitation to bridge school, home, and provider goals.",
  },
  {
    year: "2024",
    detail: "Launched multilingual Parent/Caregiver Portal with downloadable manuals and on-demand workshops.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-16 px-4 py-16">
      <div className="space-y-6">
        <SectionHeading
          eyebrow="About IBL"
          heading="Clinical expertise with the heart of a family-founded agency."
          description="IBL was started by parents, behavior analysts, and educators who believed crisis services should feel collaborative and empowering."
        />
        <p className="text-base text-slate-600">
          Today our interdisciplinary team partners with regional centers, SELPAs, school districts, and provider agencies to
          deliver wraparound services that include CALM crisis management, adaptive skill instruction, vocational readiness,
          and lifelong advocacy. We center disabled voices, emphasize trauma-informed care, and intentionally plan for life
          transitions.
        </p>
        <div className="grid gap-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm sm:grid-cols-3">
          {impactStats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-semibold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Guiding Values"
          heading="Our promises to families and provider partners"
          description="We hold ourselves accountable to these commitments on every case."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="card h-full">
              <h3 className="text-lg font-semibold text-slate-900">{value.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{value.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Leadership"
          heading="Meet the team guiding CALM and integrated services"
          description="Each program is co-led by clinicians, educators, and lived-experience caregivers."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {leadership.map((leader) => (
            <div key={leader.name} className="card h-full">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">{leader.role}</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{leader.name}</p>
              <p className="mt-2 text-sm text-slate-600">{leader.focus}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Milestones"
          heading="19 years of continuous listening and innovation"
          description="Our growth has been shaped by the families and provider partners who asked for more integrated supports."
        />
        <div className="space-y-4">
          {milestones.map((milestone) => (
            <div key={milestone.year} className="card">
              <p className="text-sm font-semibold text-indigo-600">{milestone.year}</p>
              <p className="mt-1 text-slate-700">{milestone.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
