import { prisma } from "@/lib/prisma";
import { requireStaffSession } from "@/lib/session";
import { CaseNoteForm } from "@/components/forms/case-note-form";

export default async function CaseNotesPage() {
  const staff = await requireStaffSession();
  const notes = await prisma.caseNote.findMany({
    where: { staffId: staff.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
      <section className="card space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">Case notes</h2>
        <div className="space-y-3 text-sm text-slate-600">
          {notes.map((note) => (
            <div key={note.id} className="rounded-2xl border border-slate-100 px-4 py-3">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-slate-900">{note.clientName}</p>
                <span className="text-xs text-slate-500">{new Date(note.createdAt).toLocaleString()}</span>
              </div>
              <p className="text-slate-700">{note.focusArea}</p>
              <p className="text-xs text-slate-500">{note.summary}</p>
              {note.followUp && <p className="mt-1 text-xs text-indigo-600">Follow-up: {note.followUp}</p>}
            </div>
          ))}
          {notes.length === 0 && <p>No notes yet.</p>}
        </div>
      </section>
      <section className="card">
        <h2 className="text-lg font-semibold text-slate-900">Add a case note</h2>
        <p className="mt-1 text-sm text-slate-600">Notes sync across the schedule and client dashboards.</p>
        <div className="mt-4">
          <CaseNoteForm />
        </div>
      </section>
    </div>
  );
}