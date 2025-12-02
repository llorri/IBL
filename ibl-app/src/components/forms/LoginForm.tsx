"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginValues } from "@/lib/validators";
import { Button } from "@/components/ui/Button";

export function LoginForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginValues) => {
    setErrorMessage(null);
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (result?.error) {
      setErrorMessage("Invalid credentials");
      return;
    }

    router.push("/staff/portal");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <label className="text-sm font-medium text-white/80">
        Email*
        <input
          type="email"
          {...register("email")}
          className="mt-1 w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white"
        />
        {errors.email && <span className="text-xs text-rose-300">{errors.email.message}</span>}
      </label>
      <label className="text-sm font-medium text-white/80">
        Password*
        <input
          type="password"
          {...register("password")}
          className="mt-1 w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white"
        />
        {errors.password && <span className="text-xs text-rose-300">{errors.password.message}</span>}
      </label>
      {errorMessage && <p className="text-sm text-rose-300">{errorMessage}</p>}
      <Button type="submit" disabled={isSubmitting} size="lg" className="w-full justify-center">
        {isSubmitting ? "Signing in..." : "Access Staff Portal"}
      </Button>
    </form>
  );
}
