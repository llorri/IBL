import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { scheduleSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const parsed = scheduleSchema.parse(data);

    await prisma.staffSchedule.create({
      data: {
        staffId: Number(session.user.id),
        clientName: parsed.clientName,
        serviceFocus: parsed.serviceFocus,
        meetingDate: new Date(parsed.meetingDate),
        location: parsed.location,
        notes: parsed.notes,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Schedule creation error", error);
    return NextResponse.json({ error: "Unable to save schedule" }, { status: 400 });
  }
}
