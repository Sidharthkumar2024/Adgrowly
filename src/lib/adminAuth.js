import crypto from "node:crypto";

export const ADMIN_COOKIE = "adgrowly_admin";

export function getAdminMode() {
  return process.env.ADMIN_PASSCODE ? "production" : "local-preview";
}

export function getAdminPasscode() {
  return process.env.ADMIN_PASSCODE || "local-preview";
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSCODE || "local-preview-session";
}

export function getSessionSignature() {
  return crypto.createHmac("sha256", getSessionSecret()).update("adgrowly-admin").digest("hex");
}

export function isAdminRequest(request) {
  return request.cookies.get(ADMIN_COOKIE)?.value === getSessionSignature();
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  };
}
