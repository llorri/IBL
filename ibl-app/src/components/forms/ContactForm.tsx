"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { contactFormSchema, type ContactFormValues } from "@/lib/validators";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactFormSchema) });

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("idle");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Failed");
      reset();
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-slate-200">
          Name*
          <input
            {...register("name")}
            className="mt-1 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white"
          />
          {errors.name && <span className="text-xs text-rose-300">{errors.name.message}</span>}
        </label>
        <label className="text-sm font-medium text-slate-200">
          Email*
          <input
            type="email"
            {...register("email")}
            className="mt-1 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white"
          />
          {errors.email && <span className="text-xs text-rose-300">{errors.email.message}</span>}
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-slate-200">
          Phone
          <input
            {...register("phone")}
            className="mt-1 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white"
          />
        </label>
        <label className="text-sm font-medium text-slate-200">
          Topic
          <input
            {...register("topic")}
            className="mt-1 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white"
            placeholder="Funding, training, consultation..."
          />
        </label>
      </div>
      <label className="text-sm font-medium text-slate-200">
        Message*
        <textarea
          {...register("message")}
          rows={4}
          className="mt-1 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white"
        />
        {errors.message && <span className="text-xs text-rose-300">{errors.message.message}</span>}
      </label>
      <div className="flex items-center gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
        {status === "success" && <p className="text-sm text-emerald-300">Thank you—we will reach out soon.</p>}
        {status === "error" && <p className="text-sm text-rose-300">Unable to send. Please retry.</p>}
      </div>
    </form>
  );
}
