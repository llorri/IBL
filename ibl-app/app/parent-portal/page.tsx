import { prisma } from "@/lib/prisma";
import { SectionHeading } from "@/components/section-heading";
import Link from "next/link";

export default async function ParentPortalPage() {
  const resources = await prisma.resource.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-4 py-16">
      <SectionHeading
        eyebrow="Parent & Caregiver Portal"
        heading="Download manuals, worksheets, and regulation tools"
        description="Everything shared during coaching sessions is accessible here. Files open in a new tab and can be saved or printed."
      />
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 text-sm text-slate-600">
        <p className="text-base font-semibold text-slate-900">Need translation or accessible formats?</p>
        <p className="mt-2">
          Email <a className="text-indigo-600" href="mailto:portal@ibl.org">portal@ibl.org</a> with the file name and preferred format. We can provide Spanish translations, large print, and simplified icon-based versions within 48 hours.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {resources.map((resource) => (
          <article key={resource.id} className="card">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">{resource.category}</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">{resource.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{resource.description}</p>
            <p className="mt-2 text-xs text-slate-500">Audience: {resource.audience}</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-indigo-600">
              <Link href={resource.filePath} download className="rounded-full bg-indigo-50 px-4 py-2 text-indigo-700">
                Download {resource.type}
              </Link>
            </div>
          </article>
        ))}
      </div>
      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/80 p-6 text-sm text-slate-600">
        <p className="font-semibold text-slate-900">Looking for worksheets assigned by your coach?</p>
        <p className="mt-2">
          Visit the <Link className="text-indigo-600" href="/contact">contact page</Link> to request portal credentials or upload signed materials securely.
        </p>
      </div>
    </div>
  );
}
