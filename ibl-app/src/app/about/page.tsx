import { Button } from "@/components/ui/Button";

const pillars = [
  {
    title: "Clinical + Family Partnership",
    body: "We co-design supports with individuals and caregivers, ensuring cultural humility and trauma-informed practice across every plan.",
  },
  {
    title: "Integrated Data Systems",
    body: "From behavior metrics to vocational retention dashboards, our teams visualize progress for families, funders, and partners.",
  },
  {
    title: "Statewide Workforce Development",
    body: "We equip paraprofessionals, direct support providers, and educators through CALM certification, mentorship, and communities of practice.",
  },
];

const impact = [
  { label: "Families served annually", value: "650" },
  { label: "Behavior analysts & clinicians", value: "28" },
  { label: "Community partners", value: "120" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <section className="space-y-6">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-200">About Us</p>
        <h1 className="text-4xl font-semibold">Institute for Behavior and Learning</h1>
        <p className="text-lg text-slate-200">
          Since 2002, IBL has delivered comprehensive disability services that center dignity, safety, and measurable growth. Our clinicians, educators, and advocates operate across home, school, work, and community environments to ensure cohesive care for children, adolescents, and adults.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {impact.map((item) => (
            <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-3xl font-semibold text-white">{item.value}</p>
              <p className="text-sm uppercase tracking-widest text-white/60">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-3">
        {pillars.map((pillar) => (
          <article key={pillar.title} className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <h3 className="text-xl font-semibold text-white">{pillar.title}</h3>
            <p className="mt-3 text-sm text-white/80">{pillar.body}</p>
          </article>
        ))}
      </section>

      <section className="mt-12 space-y-4 rounded-[32px] border border-white/10 bg-white/5 p-8">
        <h2 className="text-2xl font-semibold">Leadership & Interdisciplinary Team</h2>
        <p className="text-sm text-white/80">
          Board Certified Behavior Analysts, licensed marriage and family therapists, occupational therapists, CALM facilitators, and credentialed transition specialists collaborate in pods that follow each individual. Every case receives clinical oversight plus a dedicated family liaison.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/80">
          <li>Regional center & LEA partnerships for coordinated funding</li>
          <li>Telehealth and in-person coverage across urban and rural counties</li>
          <li>Culturally responsive teams fluent in Spanish, ASL, and additional languages</li>
        </ul>
        <Button asChild className="mt-4">
          <a href="/contact">Connect with leadership</a>
        </Button>
      </section>
    </div>
  );
}
