import { prisma } from "@/lib/prisma";
import { requireStaffSession } from "@/lib/session";
import { ScheduleForm } from "@/components/forms/schedule-form";

export default async function StaffSchedulePage() {
  const staff = await requireStaffSession();
  const sessions = await prisma.scheduleItem.findMany({
    where: { staffId: staff.id },
    orderBy: { sessionDate: "asc" },
  });

  return (
    <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
      <section className="card space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">Your schedule</h2>
        <div className="space-y-3 text-sm text-slate-600">
          {sessions.map((session) => (
            <div key={session.id} className="rounded-2xl border border-slate-100 px-4 py-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-slate-900">{session.clientName}</p>
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  {new Date(session.sessionDate).toLocaleDateString()}
                </span>
              </div>
              <p>{session.serviceArea}</p>
              <p className="text-xs text-slate-500">{session.location}</p>
              {session.notes && <p className="mt-1 text-xs text-slate-500">{session.notes}</p>}
            </div>
          ))}
          {sessions.length === 0 && <p>No sessions yet. Use the form to add one.</p>}
        </div>
      </section>
      <section className="card">
        <h2 className="text-lg font-semibold text-slate-900">Add a session</h2>
        <p className="mt-1 text-sm text-slate-600">Use client initials if needed for privacy in shared spaces.</p>
        <div className="mt-4">
          <ScheduleForm />
        </div>
      </section>
    </div>
  );
}
