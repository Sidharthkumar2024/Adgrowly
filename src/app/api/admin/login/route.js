import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminCookieOptions, getAdminMode, getAdminPasscode, getSessionSignature } from "@/lib/adminAuth";

export async function POST(request) {
  const { passcode } = await request.json();

  if (passcode !== getAdminPasscode()) {
    return NextResponse.json({ error: "Invalid passcode." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, mode: getAdminMode() });
  response.cookies.set(ADMIN_COOKIE, getSessionSignature(), adminCookieOptions());
  return response;
}
