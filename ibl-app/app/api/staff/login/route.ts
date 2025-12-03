import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validators";
import { createStaffToken, SESSION_COOKIE, SESSION_DURATION_SECONDS } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    const user = await prisma.staffUser.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = createStaffToken(user);
    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: SESSION_COOKIE,
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: SESSION_DURATION_SECONDS,
      path: "/",
    });
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Unable to sign in" }, { status: 400 });
  }
}
