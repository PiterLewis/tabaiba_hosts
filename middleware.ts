// Protege /admin/* — todo lo de admin requiere sesión válida.
// /admin/login queda excluido. Si el access token está expirado pero
// hay refresh token válido, refresca en línea y reescribe cookies.

import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const ACCESS_COOKIE = "th_access";
const REFRESH_COOKIE = "th_refresh";
const ACCESS_MAX_AGE = 60 * 60; // 1h
const REFRESH_MAX_AGE = 60 * 60 * 24 * 30; // 30d

// Decode base64url sin verificar firma — solo para leer `exp` y decidir
// si pedir refresh. La validación real la hace el backend en cada llamada.
function isJwtExpired(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return true;
    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = payload + "=".repeat((4 - (payload.length % 4)) % 4);
    const decoded = JSON.parse(atob(padded));
    if (typeof decoded.exp !== "number") return false;
    // 30s de margen para evitar carreras
    return decoded.exp * 1000 < Date.now() + 30_000;
  } catch {
    return true;
  }
}

function redirectToLogin(req: NextRequest): NextResponse {
  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.search = "";
  // Solo pasar `next` si no estamos ya en login (evitar loops)
  if (!req.nextUrl.pathname.startsWith("/admin/login")) {
    url.searchParams.set("next", req.nextUrl.pathname);
  }
  const res = NextResponse.redirect(url);
  // Limpiar cookies inválidas
  res.cookies.delete(ACCESS_COOKIE);
  res.cookies.delete(REFRESH_COOKIE);
  return res;
}

function applyTokensToResponse(
  res: NextResponse,
  tokens: { accessToken: string; refreshToken?: string | null }
) {
  const secure = process.env.NODE_ENV === "production";
  res.cookies.set({
    name: ACCESS_COOKIE,
    value: tokens.accessToken,
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: ACCESS_MAX_AGE,
  });
  if (tokens.refreshToken) {
    res.cookies.set({
      name: REFRESH_COOKIE,
      value: tokens.refreshToken,
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: REFRESH_MAX_AGE,
    });
  }
}

async function tryRefresh(
  refreshToken: string
): Promise<{ accessToken: string; refreshToken?: string } | null> {
  if (!API_URL) return null;
  try {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) return null;
    return (await res.json()) as {
      accessToken: string;
      refreshToken?: string;
    };
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // /admin/login es público
  if (
    pathname === "/admin/login" ||
    pathname.startsWith("/admin/login/")
  ) {
    return NextResponse.next();
  }

  const access = req.cookies.get(ACCESS_COOKIE)?.value;
  const refresh = req.cookies.get(REFRESH_COOKIE)?.value;

  // Sin cookies → login
  if (!access && !refresh) {
    return redirectToLogin(req);
  }

  // Access todavía válido → pasar
  if (access && !isJwtExpired(access)) {
    return NextResponse.next();
  }

  // Access expirado o ausente, pero hay refresh → intentar renovar
  if (refresh) {
    const refreshed = await tryRefresh(refresh);
    if (refreshed) {
      const res = NextResponse.next();
      applyTokensToResponse(res, refreshed);
      return res;
    }
  }

  // No se pudo renovar → login
  return redirectToLogin(req);
}

// Solo /admin/* — la landing pública no pasa por aquí.
export const config = {
  matcher: ["/admin/:path*"],
};
