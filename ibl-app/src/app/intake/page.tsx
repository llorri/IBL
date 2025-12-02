import { IntakeForm } from "@/components/forms/IntakeForm";

export default function IntakePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <section className="space-y-4 text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-200">Client Intake</p>
        <h1 className="text-4xl font-semibold">Tell us about your family or program</h1>
        <p className="text-lg text-slate-200">
          We serve individuals ages 3 through adulthood and their caregivers. A clinical intake coordinator will confirm details and funding within two business days.
        </p>
      </section>
      <div className="mt-10 glass-panel p-6">
        <IntakeForm />
      </div>
      <p className="mt-4 text-center text-xs text-white/60">
        By submitting this form you agree to be contacted by the Institute for Behavior and Learning. Do not include protected health information beyond what is requested above.
      </p>
    </div>
  );
}
