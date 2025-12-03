import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { intakeSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = intakeSchema.parse(body);
    await prisma.clientIntake.create({
      data: {
        ...parsed,
        age: parsed.age ? Number(parsed.age) : null,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Unable to submit intake at this time." },
      { status: 400 }
    );
  }
}
