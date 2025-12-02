import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { caseNoteSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const parsed = caseNoteSchema.parse(data);

    await prisma.caseNote.create({
      data: {
        staffId: Number(session.user.id),
        clientName: parsed.clientName,
        summary: parsed.summary,
        followUp: parsed.followUp,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Case note error", error);
    return NextResponse.json({ error: "Unable to save note" }, { status: 400 });
  }
}
