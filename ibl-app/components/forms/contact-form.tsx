"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { contactSchema, ContactFormValues } from "@/lib/validators";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("idle");
    setMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        throw new Error("We couldn't send your message just yet.");
      }
      setStatus("success");
      setMessage("Thank you! We will follow up within one business day.");
      reset();
    } catch (error) {
      setStatus("error");
      setMessage((error as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Field label="Name" error={errors.name?.message}>
        <input {...register("name")} className="input" placeholder="Your name" />
      </Field>
      <Field label="Email" error={errors.email?.message}>
        <input {...register("email")} className="input" placeholder="you@email.com" />
      </Field>
      <Field label="Subject" error={errors.subject?.message}>
        <input {...register("subject")} className="input" placeholder="Reason for reaching out" />
      </Field>
      <Field label="Message" error={errors.message?.message}>
        <textarea {...register("message")} className="input min-h-32" placeholder="How can we help?" />
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
        className="w-full rounded-full bg-slate-900 px-6 py-3 text-white font-semibold transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending" : "Send message"}
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
