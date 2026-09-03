import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "admin_session";

function getSecret(): string {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) {
    throw new Error(
      "ADMIN_PASSWORD não configurada. Defina essa variável de ambiente."
    );
  }
  return secret;
}

function sign(value: string): string {
  const secret = getSecret();
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

export function createSessionToken(): string {
  const payload = `admin:${Date.now()}`;
  const signature = sign(payload);
  return Buffer.from(`${payload}.${signature}`).toString("base64url");
}

function isValidToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const [payload, signature] = decoded.split(".");
    if (!payload || !signature) return false;
    const expected = sign(payload);
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expected)
    );
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return isValidToken(token);
}

export function verifyPassword(password: string): boolean {
  const secret = getSecret();
  if (password.length !== secret.length) return false;
  return crypto.timingSafeEqual(Buffer.from(password), Buffer.from(secret));
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
