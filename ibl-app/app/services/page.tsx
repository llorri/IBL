import { serviceAreas } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import Link from "next/link";

const anchors = [
  "calm",
  "parent",
  "adaptive",
  "community",
  "vocational",
  "independent",
  "social",
  "adult",
];

const serviceIds = serviceAreas.map((service, index) => ({
  id: anchors[index] ?? `service-${index}`,
  ...service,
}));

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-12 px-4 py-16">
      <SectionHeading
        eyebrow="Services"
        heading="Eight coordinated service areas for every stage of the lifespan"
        description="We co-design plans with families, schools, provider agencies, and regional centers to ensure continuity from crisis planning to community inclusion."
      />
      <div className="space-y-8">
        {serviceIds.map((service) => (
          <article key={service.id} id={service.id} className="card space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-semibold text-slate-900">{service.title}</h2>
              <span className="rounded-full bg-slate-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {service.audience}
              </span>
            </div>
            <p className="text-base text-slate-600">{service.summary}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {service.outcomes.map((outcome) => (
                <div key={outcome} className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-sm text-slate-600">
                  {outcome}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Need help choosing?</p>
        <p className="mt-3 text-lg text-slate-700">
          Our intake team can create a service blend that addresses CALM crisis coaching, parent advocacy, and skill building in a single plan.
        </p>
        <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/intake" className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white">
            Submit intake
          </Link>
          <Link href="/contact" className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800">
            Talk with a coordinator
          </Link>
        </div>
      </div>
    </div>
  );
}
