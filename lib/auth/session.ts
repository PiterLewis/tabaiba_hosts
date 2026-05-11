// Helpers de cookies httpOnly para los tokens JWT del admin.
// Usado por Server Actions y, parcialmente, por la API client.
// El middleware escribe cookies vía NextResponse — no usa estas funciones.

import { cookies } from "next/headers";
import type { AuthTokens } from "@/lib/api/types";

export const ACCESS_COOKIE = "th_access";
export const REFRESH_COOKIE = "th_refresh";

// Tiempos en segundos. Coordinar con el backend si cambian los exp del JWT.
export const ACCESS_MAX_AGE = 60 * 60; // 1h
export const REFRESH_MAX_AGE = 60 * 60 * 24 * 30; // 30d

const baseOpts = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export async function setSessionCookies(tokens: AuthTokens) {
  const c = await cookies();
  c.set({
    name: ACCESS_COOKIE,
    value: tokens.accessToken,
    ...baseOpts,
    maxAge: ACCESS_MAX_AGE,
  });
  c.set({
    name: REFRESH_COOKIE,
    value: tokens.refreshToken,
    ...baseOpts,
    maxAge: REFRESH_MAX_AGE,
  });
}

export async function clearSessionCookies() {
  const c = await cookies();
  c.delete(ACCESS_COOKIE);
  c.delete(REFRESH_COOKIE);
}

export async function getAccessToken(): Promise<string | null> {
  const c = await cookies();
  return c.get(ACCESS_COOKIE)?.value ?? null;
}

export async function getRefreshToken(): Promise<string | null> {
  const c = await cookies();
  return c.get(REFRESH_COOKIE)?.value ?? null;
}
