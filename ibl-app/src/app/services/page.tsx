import Link from "next/link";
import { serviceAreas } from "@/lib/services";
import { Button } from "@/components/ui/Button";

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="space-y-4 text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-200">Services</p>
        <h1 className="text-4xl font-semibold">Eight coordinated service areas</h1>
        <p className="text-lg text-slate-200">
          Each offering can stand alone or be integrated into a single plan across crisis stabilization, clinical coaching, and lifelong learning.
        </p>
      </header>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        {serviceAreas.map((service) => (
          <article key={service.id} id={service.id} className="glass-panel p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">{service.name}</h2>
              <span className="text-xs uppercase tracking-widest text-cyan-200">{service.tagline}</span>
            </div>
            <p className="mt-4 text-sm text-white/80">{service.description}</p>
            <p className="mt-4 text-xs uppercase tracking-widest text-white/60">Populations</p>
            <p className="text-sm text-white/80">{service.populations}</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/80">
              {service.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <div className="mt-12 rounded-[32px] border border-white/10 bg-white/5 p-8 text-center">
        <h2 className="text-2xl font-semibold">Unsure where to start?</h2>
        <p className="mt-2 text-sm text-white/80">
          Clinical intake will listen, review documentation, and match the right combination of services within 2 business days.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/intake">Submit Intake</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">Book a consult</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
