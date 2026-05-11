// Cliente fetch tipado para la API de Tabaiba Hosts.
// - Lee NEXT_PUBLIC_API_URL como base.
// - En Server Components / Server Actions añade el Bearer desde la cookie httpOnly.
// - Si el backend responde 401, redirige a /admin/login (el refresh
//   automático lo maneja el middleware en cada navegación).
// - Lanza ApiError tipado en 4xx/5xx.

import { redirect } from "next/navigation";
import { getAccessToken } from "@/lib/auth/session";
import type { ApiErrorBody } from "@/lib/api/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  // No reventar el build de la landing; solo avisar.
  // eslint-disable-next-line no-console
  console.warn(
    "[lib/api] NEXT_PUBLIC_API_URL no está definida. Las llamadas al backend fallarán."
  );
}

export type ApiOptions = Omit<RequestInit, "body"> & {
  /** Cuerpo JSON. Si está definido, se serializa con JSON.stringify. */
  body?: unknown;
  /** Si true, no se añade el header Authorization (útil para /auth/login). */
  unauthenticated?: boolean;
  /** Si true, redirige a /admin/login al recibir 401. Por defecto true. */
  redirectOn401?: boolean;
};

export class ApiError extends Error {
  constructor(
    public status: number,
    public body: ApiErrorBody,
    message?: string
  ) {
    super(message ?? body.message ?? `API ${status}`);
    this.name = "ApiError";
  }
}

export async function api<T>(path: string, opts: ApiOptions = {}): Promise<T> {
  const {
    unauthenticated = false,
    redirectOn401 = true,
    body,
    headers,
    ...rest
  } = opts;

  const token = unauthenticated ? null : await getAccessToken();

  const res = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: {
      Accept: "application/json",
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers || {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  if (res.status === 401 && redirectOn401) {
    redirect("/admin/login");
  }

  if (!res.ok) {
    const errBody: ApiErrorBody = await res.json().catch(() => ({}));
    throw new ApiError(res.status, errBody);
  }

  // 204 No Content
  if (res.status === 204) return undefined as T;

  return (await res.json()) as T;
}
