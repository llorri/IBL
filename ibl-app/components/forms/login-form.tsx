"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { loginSchema, LoginValues } from "@/lib/validators";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginValues) => {
    setError("");
    const res = await fetch("/api/staff/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({ message: "Unable to log in" }));
      setError(data.message || "Unable to log in");
      return;
    }

    router.replace("/staff/dashboard");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Field label="Email" error={errors.email?.message}>
        <input {...register("email")} className="input" placeholder="team@ibl.org" />
      </Field>
      <Field label="Password" error={errors.password?.message}>
        <input type="password" {...register("password")} className="input" placeholder="••••••" />
      </Field>
      {error && <p className="text-sm text-rose-600">{error}</p>}
      <button
        type="submit"
        className="w-full rounded-full bg-indigo-600 px-6 py-3 text-white font-semibold transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-400"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing in" : "Sign in"}
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
