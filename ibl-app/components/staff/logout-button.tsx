"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/staff/logout", { method: "POST" });
    router.replace("/staff/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400"
    >
      Log out
    </button>
  );
}
