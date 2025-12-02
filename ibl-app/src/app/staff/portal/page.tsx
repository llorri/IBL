import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { format } from "date-fns";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { StaffScheduleForm } from "@/components/forms/StaffScheduleForm";
import { CaseNoteForm } from "@/components/forms/CaseNoteForm";

export const dynamic = "force-dynamic";

export default async function StaffPortalPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/staff/login");
  }

  const [schedules, caseNotes] = await Promise.all([
    prisma.staffSchedule.findMany({
      where: { staffId: Number(session.user.id) },
      orderBy: { meetingDate: "asc" },
    }),
    prisma.caseNote.findMany({
      where: { staffId: Number(session.user.id) },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 space-y-10">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-200">Staff Portal</p>
        <h1 className="text-4xl font-semibold">Welcome back, {session.user?.name ?? "Clinician"}</h1>
        <p className="text-sm text-white/70">Log schedules, case notes, and access caregiver materials.</p>
      </header>
      <section className="grid gap-6 md:grid-cols-2">
        <article className="glass-panel p-6">
          <h2 className="text-xl font-semibold">Add schedule block</h2>
          <StaffScheduleForm />
        </article>
        <article className="glass-panel p-6">
          <h2 className="text-xl font-semibold">Log case note</h2>
          <CaseNoteForm />
        </article>
      </section>
      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold">Upcoming schedule</h3>
          <ul className="mt-4 space-y-4">
            {schedules.length === 0 && <li className="text-sm text-white/60">No sessions scheduled.</li>}
            {schedules.map((item) => (
              <li key={item.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <p className="text-sm font-semibold text-white">{item.clientName}</p>
                <p className="text-xs uppercase tracking-widest text-cyan-200">{item.serviceFocus}</p>
                <p className="mt-2 text-sm text-white/80">
                  {format(new Date(item.meetingDate), "MMM d, yyyy p")} · {item.location}
                </p>
                {item.notes && <p className="mt-2 text-xs text-white/70">{item.notes}</p>}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold">Recent case notes</h3>
          <ul className="mt-4 space-y-4">
            {caseNotes.length === 0 && <li className="text-sm text-white/60">No notes yet.</li>}
            {caseNotes.map((note) => (
              <li key={note.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <p className="text-sm font-semibold text-white">{note.clientName}</p>
                <p className="text-xs text-white/60">{format(new Date(note.createdAt), "MMM d, yyyy p")}</p>
                <p className="mt-2 text-sm text-white/80">{note.summary}</p>
                {note.followUp && <p className="mt-2 text-xs text-cyan-200">Follow-up: {note.followUp}</p>}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
