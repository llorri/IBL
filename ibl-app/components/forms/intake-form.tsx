"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { IntakeFormValues, intakeSchema } from "@/lib/validators";

export function IntakeForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IntakeFormValues>({
    resolver: zodResolver(intakeSchema),
    defaultValues: {
      preferredContact: "Phone",
      servicesRequested: "",
    },
  });

  const onSubmit = async (values: IntakeFormValues) => {
    setStatus("idle");
    setMessage("");
    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Unable to send intake. Please try again.");
      }
      setStatus("success");
      setMessage("Thank you. Our intake coordinator will reach out within one business day.");
      reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage((error as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="First name" error={errors.firstName?.message}>
          <input {...register("firstName")} className="input" placeholder="Jordan" />
        </Field>
        <Field label="Last name" error={errors.lastName?.message}>
          <input {...register("lastName")} className="input" placeholder="Rivera" />
        </Field>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Age" error={errors.age?.message}>
          <input {...register("age")} className="input" placeholder="10" />
        </Field>
        <Field label="Guardian or primary contact" error={errors.guardianName?.message}>
          <input {...register("guardianName")} className="input" placeholder="Patricia Rivera" />
        </Field>
        <Field label="County / Regional Center" error={errors.county?.message}>
          <input {...register("county")} className="input" placeholder="San Diego" />
        </Field>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Phone" error={errors.phone?.message}>
          <input {...register("phone")} className="input" placeholder="(555) 222-0101" />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input {...register("email")} className="input" placeholder="caregiver@email.com" />
        </Field>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Preferred contact method" error={errors.preferredContact?.message}>
          <select {...register("preferredContact")} className="input">
            <option value="Phone">Phone Call</option>
            <option value="Email">Email</option>
            <option value="Text">Text Message</option>
          </select>
        </Field>
        <Field label="Funding source" error={errors.fundingSource?.message}>
          <input {...register("fundingSource")} className="input" placeholder="Regional Center, SELPA, Private" />
        </Field>
      </div>
      <Field label="Services requested" error={errors.servicesRequested?.message}>
        <textarea
          {...register("servicesRequested")}
          className="input min-h-24"
          placeholder="Tell us about the supports you are requesting"
        />
      </Field>
      <Field label="Communication preferences" error={errors.communicationNeeds?.message}>
        <textarea
          {...register("communicationNeeds")}
          className="input"
          placeholder="Languages, preferred AAC, interpreters, etc."
        />
      </Field>
      <Field label="Safety considerations" error={errors.safetyConcerns?.message}>
        <textarea
          {...register("safetyConcerns")}
          className="input"
          placeholder="Triggers, medical alerts, de-escalation tools"
        />
      </Field>
      <Field label="Goals and priorities" error={errors.goals?.message}>
        <textarea
          {...register("goals")}
          className="input"
          placeholder="Share what success looks like for your family"
        />
      </Field>
      {message && (
        <p
          className={`rounded-md border px-3 py-2 text-sm ${
            status === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700"
          }`}
        >
          {message}
        </p>
      )}
      <button
        type="submit"
        className="w-full rounded-full bg-indigo-600 px-6 py-3 text-white font-semibold transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-400"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Submit intake"}
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
