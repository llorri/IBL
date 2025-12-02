import { ContactForm } from "@/components/forms/ContactForm";

const offices = [
  {
    region: "San Diego",
    address: "4444 Mission Blvd, Suite 210\nSan Diego, CA 92109",
    phone: "(619) 555-0144",
  },
  {
    region: "Los Angeles",
    address: "1250 N Highland Ave\nLos Angeles, CA 90038",
    phone: "(323) 555-0192",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <header className="space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-200">Contact</p>
        <h1 className="text-4xl font-semibold">Connect with the intake & partnerships team</h1>
        <p className="text-lg text-slate-200">
          Call (800) 512-IBL1 or use the form below. We respond within two business days.
        </p>
      </header>
      <div className="mt-10 grid gap-8 md:grid-cols-[3fr_2fr]">
        <div className="glass-panel p-6">
          <ContactForm />
        </div>
        <aside className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">Regional Offices</h2>
          {offices.map((office) => (
            <div key={office.region} className="mt-4">
              <p className="text-sm uppercase tracking-widest text-white/60">{office.region}</p>
              <p className="mt-1 text-sm whitespace-pre-line text-white/80">{office.address}</p>
              <p className="mt-1 text-sm text-cyan-200">{office.phone}</p>
            </div>
          ))}
          <div className="mt-6 text-sm text-white/70">
            Email <a className="text-cyan-200" href="mailto:intake@ibl.org">intake@ibl.org</a>
            <br />
            Fax (858) 555-0174
          </div>
        </aside>
      </div>
    </div>
  );
}
