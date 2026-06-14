import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/adminAuth";
import { getDataMode, listSubmissions } from "@/lib/submissions";

export async function GET(request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const submissions = await listSubmissions();
    return NextResponse.json({ submissions, mode: getDataMode() });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to load submissions." }, { status: 500 });
  }
}
