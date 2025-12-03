import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getStaffSession } from "@/lib/session";
import { caseNoteSchema } from "@/lib/validators";

export async function GET() {
  const session = await getStaffSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const notes = await prisma.caseNote.findMany({
    where: { staffId: session.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(notes);
}

export async function POST(request: Request) {
  try {
    const session = await getStaffSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const parsed = caseNoteSchema.parse(body);
    await prisma.caseNote.create({
      data: {
        staffId: session.id,
        clientName: parsed.clientName,
        focusArea: parsed.focusArea,
        summary: parsed.summary,
        followUp: parsed.followUp,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Unable to save note" }, { status: 400 });
  }
}
