import { ContactForm } from "@/components/forms/contact-form";
import { SectionHeading } from "@/components/section-heading";

const locations = [
  {
    title: "San Diego Collaborative",
    address: "7420 Mission Center Road, Suite 210, San Diego, CA",
    phone: "(555) 555-1234",
  },
  {
    title: "Los Angeles Transition Studio",
    address: "4300 Sunset Blvd, Los Angeles, CA",
    phone: "(555) 555-5678",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 px-4 py-16">
      <SectionHeading
        eyebrow="Connect"
        heading="Tell us how we can partner with you"
        description="We respond to all inquiries within one business day. For urgent CALM situations, please call the after-hours line listed below."
      />
      <div className="grid gap-8 md:grid-cols-2">
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900">Send a message</h2>
          <p className="mt-2 text-sm text-slate-600">Share a little context and we&rsquo;ll connect you to the right director.</p>
          <div className="mt-4">
            <ContactForm />
          </div>
        </div>
        <div className="space-y-6">
          <div className="card space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">Phone & Email</p>
            <div className="text-sm text-slate-600">
              <p>
                Main line: <a className="text-indigo-600" href="tel:15555551234">(555) 555-1234</a>
              </p>
              <p>
                Intake: <a className="text-indigo-600" href="mailto:intake@ibl.org">intake@ibl.org</a>
              </p>
              <p>
                After-hours CALM: <a className="text-indigo-600" href="tel:15555559876">(555) 555-9876</a>
              </p>
            </div>
          </div>
          <div className="card space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">Regional hubs</p>
            <ul className="space-y-4 text-sm text-slate-600">
              {locations.map((location) => (
                <li key={location.title}>
                  <p className="font-semibold text-slate-900">{location.title}</p>
                  <p>{location.address}</p>
                  <p>
                    <a className="text-indigo-600" href={`tel:${location.phone.replace(/[^\d+]/g, "")}`}>
                      {location.phone}
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
