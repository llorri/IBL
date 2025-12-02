"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { intakeFormSchema, type IntakeFormValues } from "@/lib/validators";

export function IntakeForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IntakeFormValues>({
    resolver: zodResolver(intakeFormSchema),
    defaultValues: {
      preferredContact: "Email",
    },
  });

  const onSubmit = async (values: IntakeFormValues) => {
    setStatus("idle");
    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
      reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="grid gap-2 md:grid-cols-2">
        <label className="text-sm font-medium text-white/70">
          Client Name*
          <input
            {...register("clientName")}
            className="mt-1 w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white"
            placeholder="Legal or preferred name"
          />
          {errors.clientName && <p className="text-xs text-rose-300">{errors.clientName.message}</p>}
        </label>
        <label className="text-sm font-medium text-white/70">
          Date of Birth
          <input
            {...register("dateOfBirth")}
            type="date"
            className="mt-1 w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white"
          />
        </label>
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        <label className="text-sm font-medium text-white/70">
          Diagnosis / Key Considerations
          <input
            {...register("diagnosis")}
            className="mt-1 w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white"
            placeholder="e.g., Autism, dual diagnosis"
          />
        </label>
        <label className="text-sm font-medium text-white/70">
          Service Area of Interest*
          <select
            {...register("serviceInterest")}
            className="mt-1 w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white"
          >
            <option value="">Select a service</option>
            <option value="CALM">CALM Crisis Management</option>
            <option value="Caregiver Support">Parent/Caregiver Support</option>
            <option value="Behavior & Adaptive">Behavior & Adaptive Skills</option>
            <option value="Community Inclusion">Community Inclusion</option>
            <option value="Vocational">Vocational / Pre-Vocational</option>
            <option value="Independent Living">Independent Living Skills</option>
            <option value="Social & Emotional">Social Skills & Emotional Regulation</option>
            <option value="Adult Behavior Support">Adult Behavior Support</option>
          </select>
          {errors.serviceInterest && (
            <p className="text-xs text-rose-300">{errors.serviceInterest.message}</p>
          )}
        </label>
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        <label className="text-sm font-medium text-white/70">
          Parent / Caregiver Name*
          <input
            {...register("guardianName")}
            className="mt-1 w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white"
          />
          {errors.guardianName && <p className="text-xs text-rose-300">{errors.guardianName.message}</p>}
        </label>
        <label className="text-sm font-medium text-white/70">
          Preferred Contact Method*
          <select
            {...register("preferredContact")}
            className="mt-1 w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white"
          >
            <option>Email</option>
            <option>Phone</option>
            <option>Text</option>
            <option>Virtual Meeting</option>
          </select>
        </label>
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        <label className="text-sm font-medium text-white/70">
          Email*
          <input
            {...register("guardianEmail")}
            type="email"
            className="mt-1 w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white"
          />
          {errors.guardianEmail && <p className="text-xs text-rose-300">{errors.guardianEmail.message}</p>}
        </label>
        <label className="text-sm font-medium text-white/70">
          Phone
          <input
            {...register("guardianPhone")}
            className="mt-1 w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white"
            placeholder="###-###-####"
          />
        </label>
      </div>
      <label className="text-sm font-medium text-white/70">
        Current goals, safety considerations, or funding source
        <textarea
          {...register("details")}
          rows={4}
          className="mt-1 w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white"
          placeholder="Share any context to help our clinical team triage your request."
        />
      </label>
      <div className="flex items-center gap-4">
        <Button type="submit" disabled={isSubmitting} size="lg">
          {isSubmitting ? "Submitting..." : "Submit Intake"}
        </Button>
        {status === "success" && <p className="text-sm text-emerald-300">We received your intake. A coordinator will respond within 2 business days.</p>}
        {status === "error" && <p className="text-sm text-rose-300">Something went wrong. Please try again.</p>}
      </div>
    </form>
  );
}
