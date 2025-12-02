import { z } from "zod";

export const intakeFormSchema = z.object({
  clientName: z.string().min(2, "Client name is required"),
  dateOfBirth: z.string().optional(),
  diagnosis: z.string().optional(),
  serviceInterest: z.string().min(2, "Select a service"),
  guardianName: z.string().min(2, "Guardian name is required"),
  guardianEmail: z.string().email("Valid email required"),
  guardianPhone: z.string().optional(),
  preferredContact: z.string().min(2),
  details: z.string().optional(),
});

export const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  topic: z.string().optional(),
  message: z.string().min(10, "Share a few more details"),
});

export const scheduleSchema = z.object({
  clientName: z.string().min(2),
  serviceFocus: z.string().min(2),
  meetingDate: z.string().min(2),
  location: z.string().min(2),
  notes: z.string().optional(),
});

export const caseNoteSchema = z.object({
  clientName: z.string().min(2),
  summary: z.string().min(10, "Include a concise summary"),
  followUp: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type IntakeFormValues = z.infer<typeof intakeFormSchema>;
export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type ScheduleFormValues = z.infer<typeof scheduleSchema>;
export type CaseNoteFormValues = z.infer<typeof caseNoteSchema>;
export type LoginValues = z.infer<typeof loginSchema>;
