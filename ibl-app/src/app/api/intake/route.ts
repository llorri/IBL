import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { intakeFormSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const parsed = intakeFormSchema.parse(data);

    await prisma.intakeSubmission.create({
      data: parsed,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Intake submission failed", error);
    return NextResponse.json({ success: false, error: "Unable to submit intake" }, { status: 400 });
  }
}
