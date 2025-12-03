import { ReactNode } from "react";
import { requireStaffSession } from "@/lib/session";
import { StaffNav } from "@/components/staff/staff-nav";
import { LogoutButton } from "@/components/staff/logout-button";

export default async function StaffLayout({ children }: { children: ReactNode }) {
  const session = await requireStaffSession();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 space-y-8">
      <header className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">Staff workspace</p>
            <h1 className="text-3xl font-semibold text-slate-900">Welcome back, {session.name}</h1>
            <p className="text-sm text-slate-600">Role: {session.role}</p>
          </div>
          <LogoutButton />
        </div>
        <div className="mt-6">
          <StaffNav />
        </div>
      </header>
      <div>{children}</div>
    </div>
  );
}
