"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { scheduleSchema, ScheduleValues } from "@/lib/validators";
import { serviceAreas } from "@/lib/content";
import { useRouter } from "next/navigation";

export function ScheduleForm() {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ScheduleValues>({ resolver: zodResolver(scheduleSchema) });

  const onSubmit = async (values: ScheduleValues) => {
    setMessage(null);
    const res = await fetch("/api/staff/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({ message: "Could not save session" }));
      setMessage(data.message);
      return;
    }

    setMessage("Session scheduled.");
    reset();
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Field label="Client" error={errors.clientName?.message}>
        <input {...register("clientName")} className="input" placeholder="Client initials" />
      </Field>
      <Field label="Service area" error={errors.serviceArea?.message}>
        <select {...register("serviceArea")} className="input">
          <option value="">Select</option>
          {serviceAreas.map((service) => (
            <option key={service.title} value={service.title}>
              {service.title}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Session date" error={errors.sessionDate?.message}>
        <input type="datetime-local" {...register("sessionDate")} className="input" />
      </Field>
      <Field label="Location" error={errors.location?.message}>
        <input {...register("location")} className="input" placeholder="Family home, community site..." />
      </Field>
      <Field label="Notes" error={errors.notes?.message}>
        <textarea {...register("notes")} className="input" placeholder="Session focus" />
      </Field>
      {message && <p className="text-sm text-emerald-600">{message}</p>}
      <button
        type="submit"
        className="w-full rounded-full bg-indigo-600 px-6 py-3 text-white font-semibold disabled:cursor-not-allowed disabled:bg-slate-400"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving" : "Add session"}
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
