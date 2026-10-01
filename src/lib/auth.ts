import crypto from "crypto";
import { cookies } from "next/headers";
import { getAdminUser, AdminUser } from "./db";

const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET || "umkm-briket-nusantara-ember-secret-key-2025";
export const ADMIN_COOKIE_NAME = "umkm_admin_token";

export interface SessionPayload {
  userId: string;
  username: string;
  email: string;
  exp: number; // unix timestamp in ms
}

// Create HMAC SHA256 signature
function signData(data: string): string {
  return crypto.createHmac("sha256", SESSION_SECRET).update(data).digest("hex");
}

export function generateSessionToken(admin: AdminUser): string {
  const payload: SessionPayload = {
    userId: admin.id,
    username: admin.username,
    email: admin.email,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = signData(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token: string): SessionPayload | null {
  try {
    if (!token || !token.includes(".")) return null;
    const [encodedPayload, signature] = token.split(".");
    if (!encodedPayload || !signature) return null;

    const expectedSig = signData(encodedPayload);
    if (expectedSig !== signature) return null;

    const payload: SessionPayload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf-8")
    );

    if (Date.now() > payload.exp) {
      return null; // Expired
    }

    return payload;
  } catch (err) {
    console.error("Session verification failed:", err);
    return null;
  }
}

// Server-side check for Next.js Server Components / Route Handlers
export async function getAdminSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get(ADMIN_COOKIE_NAME);
    if (!tokenCookie?.value) return null;

    return verifySessionToken(tokenCookie.value);
  } catch {
    return null;
  }
}

// Verify if admin is authenticated from a Request object
export function verifyAuthFromRequest(request: Request): SessionPayload | null {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${ADMIN_COOKIE_NAME}=`));

  if (!match) return null;
  const token = match.split("=")[1];
  return verifySessionToken(token);
}
