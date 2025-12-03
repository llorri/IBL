"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CaseNoteValues, caseNoteSchema } from "@/lib/validators";
import { useRouter } from "next/navigation";

export function CaseNoteForm() {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CaseNoteValues>({ resolver: zodResolver(caseNoteSchema) });

  const onSubmit = async (values: CaseNoteValues) => {
    setMessage(null);
    const res = await fetch("/api/staff/case-notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({ message: "Could not save note" }));
      setMessage(data.message);
      return;
    }

    setMessage("Case note saved.");
    reset();
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Field label="Client" error={errors.clientName?.message}>
        <input {...register("clientName")} className="input" placeholder="Client initials" />
      </Field>
      <Field label="Focus area" error={errors.focusArea?.message}>
        <input {...register("focusArea")} className="input" placeholder="Communication, crisis, employment..." />
      </Field>
      <Field label="Summary" error={errors.summary?.message}>
        <textarea {...register("summary")} className="input min-h-32" placeholder="Session summary" />
      </Field>
      <Field label="Follow-up" error={errors.followUp?.message}>
        <textarea {...register("followUp")} className="input" placeholder="Next steps" />
      </Field>
      {message && <p className="text-sm text-emerald-600">{message}</p>}
      <button
        type="submit"
        className="w-full rounded-full bg-slate-900 px-6 py-3 text-white font-semibold disabled:cursor-not-allowed disabled:bg-slate-400"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving" : "Add note"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm">
      <span className="text-slate-600">{label}</span>
      <div className="mt-1">{children}</div>
      {error && <span className="mt-1 block text-xs text-rose-600">{error}</span>}
    </label>
  );
}
