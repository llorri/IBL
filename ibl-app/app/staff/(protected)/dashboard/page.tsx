import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireStaffSession } from "@/lib/session";

export default async function StaffDashboard() {
  const staff = await requireStaffSession();
  const [upcoming, notes] = await Promise.all([
    prisma.scheduleItem.findMany({
      where: { staffId: staff.id, sessionDate: { gte: new Date() } },
      orderBy: { sessionDate: "asc" },
      take: 3,
    }),
    prisma.caseNote.findMany({
      where: { staffId: staff.id },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
  ]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section className="card space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Upcoming sessions</h2>
          <Link href="/staff/schedule" className="text-sm font-semibold text-indigo-600">
            Manage schedule
          </Link>
        </div>
        <ul className="space-y-3 text-sm text-slate-600">
          {upcoming.map((session) => (
            <li key={session.id} className="rounded-2xl border border-slate-100 px-4 py-3">
              <p className="text-slate-900">
                {session.clientName} · {session.serviceArea}
              </p>
              <p>{new Date(session.sessionDate).toLocaleString()}</p>
              <p className="text-xs text-slate-500">{session.location}</p>
            </li>
          ))}
          {upcoming.length === 0 && <p>No sessions scheduled yet.</p>}
        </ul>
      </section>
      <section className="card space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Latest case notes</h2>
          <Link href="/staff/case-notes" className="text-sm font-semibold text-indigo-600">
            Review notes
          </Link>
        </div>
        <ul className="space-y-3 text-sm text-slate-600">
          {notes.map((note) => (
            <li key={note.id} className="rounded-2xl border border-slate-100 px-4 py-3">
              <p className="text-slate-900">{note.clientName}</p>
              <p>{note.focusArea}</p>
              <p className="text-xs text-slate-500">{new Date(note.createdAt).toLocaleString()}</p>
            </li>
          ))}
          {notes.length === 0 && <p>No case notes yet.</p>}
        </ul>
      </section>
    </div>
  );
}
