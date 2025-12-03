import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getStaffSession } from "@/lib/session";
import { scheduleSchema } from "@/lib/validators";

export async function GET() {
  const session = await getStaffSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = await prisma.scheduleItem.findMany({
    where: { staffId: session.id },
    orderBy: { sessionDate: "asc" },
  });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const session = await getStaffSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const parsed = scheduleSchema.parse(body);
    await prisma.scheduleItem.create({
      data: {
        staffId: session.id,
        clientName: parsed.clientName,
        serviceArea: parsed.serviceArea,
        sessionDate: new Date(parsed.sessionDate),
        location: parsed.location,
        notes: parsed.notes,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Unable to save session" }, { status: 400 });
  }
}
