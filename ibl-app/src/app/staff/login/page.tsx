import { LoginForm } from "@/components/forms/LoginForm";
import Link from "next/link";

export default function StaffLoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="text-center space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-200">Staff Portal</p>
        <h1 className="text-3xl font-semibold">Secure login</h1>
        <p className="text-sm text-white/70">Use the credentials provided by the Institute for Behavior and Learning.</p>
      </div>
      <div className="mt-10 glass-panel p-8">
        <LoginForm />
      </div>
      <p className="mt-6 text-center text-xs text-white/60">
        Having trouble? Email <Link className="text-cyan-200" href="mailto:support@ibl.org">support@ibl.org</Link>
      </p>
    </div>
  );
}
