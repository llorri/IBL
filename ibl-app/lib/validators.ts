import { z } from "zod";

export const intakeSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  age: z.string().optional(),
  guardianName: z.string().optional(),
  phone: z.string().min(7, "Enter a phone number"),
  email: z.string().email(),
  preferredContact: z.string().optional(),
  county: z.string().optional(),
  fundingSource: z.string().optional(),
  servicesRequested: z.string().min(5, "Tell us what you need"),
  communicationNeeds: z.string().optional(),
  safetyConcerns: z.string().optional(),
  goals: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email(),
  subject: z.string().min(3, "Add a subject"),
  message: z.string().min(10, "Provide a little more detail"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password is required"),
});

export const scheduleSchema = z.object({
  clientName: z.string().min(1),
  serviceArea: z.string().min(1),
  sessionDate: z.string().min(1),
  location: z.string().min(1),
  notes: z.string().optional(),
});

export const caseNoteSchema = z.object({
  clientName: z.string().min(1),
  focusArea: z.string().min(1),
  summary: z.string().min(5),
  followUp: z.string().optional(),
});

export type IntakeFormValues = z.infer<typeof intakeSchema>;
export type ContactFormValues = z.infer<typeof contactSchema>;
export type LoginValues = z.infer<typeof loginSchema>;
export type ScheduleValues = z.infer<typeof scheduleSchema>;
export type CaseNoteValues = z.infer<typeof caseNoteSchema>;
