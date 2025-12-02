"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { caseNoteSchema, type CaseNoteFormValues } from "@/lib/validators";

export function CaseNoteForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CaseNoteFormValues>({ resolver: zodResolver(caseNoteSchema) });

  const onSubmit = async (values: CaseNoteFormValues) => {
    setStatus("idle");
    try {
      const response = await fetch("/api/staff/case-notes", {
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
      <label className="text-sm font-medium text-slate-100">
        Client Name*
        <input
          {...register("clientName")}
          className="mt-1 w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-2.5"
        />
        {errors.clientName && <span className="text-xs text-rose-300">{errors.clientName.message}</span>}
      </label>
      <label className="text-sm font-medium text-slate-100">
        Summary*
        <textarea
          {...register("summary")}
          rows={4}
          className="mt-1 w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-2.5"
          placeholder="Objective data, response, plan"
        />
        {errors.summary && <span className="text-xs text-rose-300">{errors.summary.message}</span>}
      </label>
      <label className="text-sm font-medium text-slate-100">
        Follow-up
        <textarea
          {...register("followUp")}
          rows={2}
          className="mt-1 w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-2.5"
          placeholder="Assignments, next steps"
        />
      </label>
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Log Case Note"}
        </Button>
        {status === "error" && <p className="text-sm text-rose-300">Unable to save note.</p>}
      </div>
    </form>
  );
}
