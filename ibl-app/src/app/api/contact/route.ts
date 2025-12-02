import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactFormSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const parsed = contactFormSchema.parse(data);

    await prisma.contactMessage.create({
      data: parsed,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error", error);
    return NextResponse.json({ success: false, error: "Unable to send message" }, { status: 400 });
  }
}
