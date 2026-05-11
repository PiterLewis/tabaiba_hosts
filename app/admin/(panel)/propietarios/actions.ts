"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { propietarios } from "@/lib/api/endpoints";
import { ApiError } from "@/lib/api/client";

const estadoEnum = z.enum(["activo", "pausado", "baja"]);

const propietarioSchema = z.object({
  nombre: z.string().trim().min(1, "Nombre obligatorio"),
  email: z
    .string()
    .trim()
    .email("Email inválido")
    .optional()
    .or(z.literal("")),
  telefono: z.string().trim().optional().or(z.literal("")),
  estado: estadoEnum.optional(),
  notas: z.string().trim().optional().or(z.literal("")),
});

export type PropietarioActionState = {
  ok?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

function normalize(input: z.infer<typeof propietarioSchema>) {
  return {
    nombre: input.nombre,
    email: input.email ? input.email : null,
    telefono: input.telefono ? input.telefono : null,
    estado: input.estado ?? "activo",
    notas: input.notas ? input.notas : null,
  };
}

function toFieldErrors(err: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = String(issue.path[0] ?? "_");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

function apiErrorState(err: unknown): PropietarioActionState {
  if (err instanceof ApiError) {
    return { error: err.body.message ?? `Error ${err.status}` };
  }
  return { error: "Error de conexión con el servidor" };
}

export async function createPropietarioAction(
  _prev: PropietarioActionState,
  formData: FormData
): Promise<PropietarioActionState> {
  const parsed = propietarioSchema.safeParse({
    nombre: formData.get("nombre"),
    email: formData.get("email"),
    telefono: formData.get("telefono"),
    estado: formData.get("estado"),
    notas: formData.get("notas"),
  });

  if (!parsed.success) {
    return { fieldErrors: toFieldErrors(parsed.error) };
  }

  try {
    await propietarios.create(normalize(parsed.data));
  } catch (err) {
    return apiErrorState(err);
  }

  revalidatePath("/admin/propietarios");
  return { ok: true };
}

export async function updatePropietarioAction(
  id: string,
  _prev: PropietarioActionState,
  formData: FormData
): Promise<PropietarioActionState> {
  const parsed = propietarioSchema.partial().safeParse({
    nombre: formData.get("nombre"),
    email: formData.get("email"),
    telefono: formData.get("telefono"),
    estado: formData.get("estado"),
    notas: formData.get("notas"),
  });

  if (!parsed.success) {
    return { fieldErrors: toFieldErrors(parsed.error) };
  }

  try {
    await propietarios.update(id, normalize(parsed.data as never));
  } catch (err) {
    return apiErrorState(err);
  }

  revalidatePath("/admin/propietarios");
  revalidatePath(`/admin/propietarios/${id}`);
  return { ok: true };
}

export async function deletePropietarioAction(
  id: string
): Promise<PropietarioActionState> {
  try {
    await propietarios.remove(id);
  } catch (err) {
    return apiErrorState(err);
  }
  revalidatePath("/admin/propietarios");
  return { ok: true };
}
