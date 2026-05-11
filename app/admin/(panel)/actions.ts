"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/api/endpoints";
import { clearSessionCookies } from "@/lib/auth/session";

export async function logoutAction() {
  // Avisamos al backend (revoca el refresh token), pero no bloqueamos
  // el logout local si el servidor está caído.
  try {
    await auth.logout();
  } catch {
    // ignorar — borramos cookies localmente igual
  }
  await clearSessionCookies();
  redirect("/admin/login");
}
