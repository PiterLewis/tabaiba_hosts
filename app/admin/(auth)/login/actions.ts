"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { auth } from "@/lib/api/endpoints";
import { setSessionCookies } from "@/lib/auth/session";
import { ApiError } from "@/lib/api/client";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

export type LoginState = {
  error?: string;
};

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  try {
    const tokens = await auth.login(parsed.data);
    await setSessionCookies(tokens);
  } catch (err) {
    if (err instanceof ApiError) {
      if (err.status === 401) {
        return { error: "Email o contraseña incorrectos" };
      }
      return {
        error: err.body.message ?? `No se pudo iniciar sesión (${err.status})`,
      };
    }
    return { error: "Error de conexión con el servidor" };
  }

  // Validar redirect interno para evitar open-redirect
  const rawNext = formData.get("next");
  const next =
    typeof rawNext === "string" && rawNext.startsWith("/admin")
      ? rawNext
      : "/admin";
  redirect(next);
}
