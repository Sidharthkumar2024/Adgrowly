import { NextResponse } from "next/server";
import { createSubmission, getDataMode } from "@/lib/submissions";

export async function POST(request) {
  try {
    const body = await request.json();
    const submission = await createSubmission(body);

    return NextResponse.json({
      submission,
      mode: getDataMode(),
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to submit intake." }, { status: 400 });
  }
}
