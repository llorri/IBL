import { LoginForm } from "@/components/forms/login-form";

export default function StaffLoginPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-16">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">Staff Portal</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Log in to manage schedules and case notes</h1>
        <p className="mt-2 text-sm text-slate-600">
          Use your @ibl.org credentials. Need access? Email operations@ibl.org to request an account.
        </p>
      </div>
      <div className="card">
        <LoginForm />
      </div>
    </div>
  );
}
