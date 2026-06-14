import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/adminAuth";
import { deleteSubmission, updateSubmissionStatus } from "@/lib/submissions";

export async function PATCH(request, { params }) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { status } = await request.json();
    const submission = await updateSubmissionStatus(id, status);
    return NextResponse.json({ submission });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to update submission." }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = await params;
    await deleteSubmission(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to delete submission." }, { status: 400 });
  }
}
