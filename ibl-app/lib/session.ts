import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { StaffUser } from "@prisma/client";

export const SESSION_COOKIE = "ibl_staff_session";
export const SESSION_DURATION_SECONDS = 60 * 60 * 8; // 8 hours

export type StaffSession = {
  id: number;
  email: string;
  name: string;
  role: string;
};

function getSecret() {
  const secret = process.env.STAFF_JWT_SECRET;
  if (!secret) {
    throw new Error("STAFF_JWT_SECRET is not set. Add it to your environment variables.");
  }
  return secret;
}

export function createStaffToken(user: StaffUser) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role },
    getSecret(),
    { expiresIn: SESSION_DURATION_SECONDS }
  );
}

export async function getStaffSession(): Promise<StaffSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, getSecret()) as StaffSession;
  } catch {
    cookieStore.delete(SESSION_COOKIE);
    return null;
  }
}

export async function requireStaffSession() {
  const session = await getStaffSession();
  if (!session) {
    redirect("/staff/login");
  }
  return session;
}
