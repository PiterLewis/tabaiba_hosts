// Tipos compartidos con el backend (Tabaiba Hosts API).
// Por ahora a mano; cuando el backend exponga OpenAPI en /docs los
// regeneraremos con `openapi-typescript`. Mantener alineados con el
// schema de Prisma del backend.

// ---------- Auth ----------

export type LoginInput = {
  email: string;
  password: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type CurrentUser = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "owner" | "staff";
};

// ---------- Dominio ----------

export type EstadoPropietario = "activo" | "pausado" | "baja";

export type Propietario = {
  id: string;
  nombre: string;
  email: string | null;
  telefono: string | null;
  estado: EstadoPropietario;
  pisosCount: number;
  notas: string | null;
  createdAt: string; // ISO
  updatedAt: string; // ISO
};

export type PropietarioInput = {
  nombre: string;
  email?: string | null;
  telefono?: string | null;
  estado?: EstadoPropietario;
  notas?: string | null;
};

// ---------- Errores ----------

export type ApiErrorBody = {
  message?: string;
  code?: string;
  details?: unknown;
};
