import { IntakeForm } from "@/components/forms/intake-form";
import { SectionHeading } from "@/components/section-heading";

const steps = [
  {
    title: "Connection",
    detail: "Intake coordinator schedules a call within one business day to confirm eligibility and funding.",
  },
  {
    title: "Design",
    detail: "We gather records, meet the team, and co-develop a service plan that blends CALM, advocacy, and skills.",
  },
  {
    title: "Launch",
    detail: "Your assigned team provides schedules, data dashboards, and portal access for ongoing collaboration.",
  },
];

export default function IntakePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 px-4 py-16">
      <SectionHeading
        eyebrow="Intake"
        heading="Start services with the Institute for Behavior and Learning"
        description="Share a few details so we can match you with the right clinician or advocate. We support individuals ages 3 through adulthood."
      />
      <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
        <div className="card">
          <h2 className="text-xl font-semibold text-slate-900">Client & Caregiver Intake</h2>
          <p className="mt-2 text-sm text-slate-600">Provide as much detail as you&rsquo;d like—we will review everything and follow up quickly.</p>
          <div className="mt-6">
            <IntakeForm />
          </div>
        </div>
        <div className="space-y-6">
          <div className="card space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">What to expect</p>
            <ul className="space-y-4 text-sm text-slate-600">
              {steps.map((step) => (
                <li key={step.title}>
                  <p className="font-semibold text-slate-900">{step.title}</p>
                  <p className="mt-1">{step.detail}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="card space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">Need immediate CALM support?</p>
            <p className="text-sm text-slate-600">
              Call our after-hours line at <a className="text-indigo-600" href="tel:15555559876">(555) 555-9876</a> for crisis coaching between 6pm-10pm PT.
            </p>
            <p className="text-sm text-slate-600">
              Email documentation to <a className="text-indigo-600" href="mailto:intake@ibl.org">intake@ibl.org</a> or upload directly in the parent portal once access is provided.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
