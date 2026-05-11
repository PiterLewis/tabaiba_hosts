// Funciones por endpoint del backend. Cada grupo agrupa los métodos
// REST de un recurso. La autenticación (Bearer) la añade `api()`
// leyendo la cookie httpOnly.

import { api } from "@/lib/api/client";
import type {
  AuthTokens,
  CurrentUser,
  LoginInput,
  Propietario,
  PropietarioInput,
} from "@/lib/api/types";

// ---------- Auth ----------

export const auth = {
  login: (input: LoginInput) =>
    api<AuthTokens>("/auth/login", {
      method: "POST",
      body: input,
      unauthenticated: true,
      redirectOn401: false, // queremos manejar el error de credenciales en el form
    }),

  refresh: (refreshToken: string) =>
    api<AuthTokens>("/auth/refresh", {
      method: "POST",
      body: { refreshToken },
      unauthenticated: true,
      redirectOn401: false,
    }),

  me: () => api<CurrentUser>("/auth/me"),

  logout: () =>
    api<{ ok: true }>("/auth/logout", {
      method: "POST",
      redirectOn401: false,
    }),
};

// ---------- Propietarios ----------

export const propietarios = {
  list: () => api<Propietario[]>("/propietarios"),

  get: (id: string) => api<Propietario>(`/propietarios/${id}`),

  create: (input: PropietarioInput) =>
    api<Propietario>("/propietarios", { method: "POST", body: input }),

  update: (id: string, input: Partial<PropietarioInput>) =>
    api<Propietario>(`/propietarios/${id}`, { method: "PATCH", body: input }),

  remove: (id: string) =>
    api<{ ok: true }>(`/propietarios/${id}`, { method: "DELETE" }),
};
