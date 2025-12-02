"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { scheduleSchema, type ScheduleFormValues } from "@/lib/validators";

export function StaffScheduleForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ScheduleFormValues>({ resolver: zodResolver(scheduleSchema) });

  const onSubmit = async (values: ScheduleFormValues) => {
    setStatus("idle");
    try {
      const response = await fetch("/api/staff/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Failed");
      reset();
      router.refresh();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-slate-100">
          Client Name*
          <input
            {...register("clientName")}
            className="mt-1 w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-2.5"
          />
          {errors.clientName && <span className="text-xs text-rose-300">{errors.clientName.message}</span>}
        </label>
        <label className="text-sm font-medium text-slate-100">
          Service Focus*
          <input
            {...register("serviceFocus")}
            className="mt-1 w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-2.5"
          />
          {errors.serviceFocus && <span className="text-xs text-rose-300">{errors.serviceFocus.message}</span>}
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-slate-100">
          Meeting Date & Time*
          <input
            type="datetime-local"
            {...register("meetingDate")}
            className="mt-1 w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-2.5"
          />
          {errors.meetingDate && <span className="text-xs text-rose-300">{errors.meetingDate.message}</span>}
        </label>
        <label className="text-sm font-medium text-slate-100">
          Location*
          <input
            {...register("location")}
            className="mt-1 w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-2.5"
          />
          {errors.location && <span className="text-xs text-rose-300">{errors.location.message}</span>}
        </label>
      </div>
      <label className="text-sm font-medium text-slate-100">
        Notes
        <textarea
          {...register("notes")}
          rows={3}
          className="mt-1 w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-2.5"
        />
      </label>
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Add to Schedule"}
        </Button>
        {status === "error" && <p className="text-sm text-rose-300">Unable to save entry.</p>}
      </div>
    </form>
  );
}
