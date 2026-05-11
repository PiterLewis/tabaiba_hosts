import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { propietarios } from "@/lib/api/endpoints";
import { NuevoPropietarioDialog } from "@/components/admin/propietario-form";
import { PropietariosRowActions } from "@/components/admin/propietarios-row-actions";
import type { Propietario, EstadoPropietario } from "@/lib/api/types";

async function safeList(): Promise<{ data: Propietario[]; error?: string }> {
  try {
    const data = await propietarios.list();
    return { data };
  } catch (err) {
    if (
      err &&
      typeof err === "object" &&
      "digest" in err &&
      String((err as { digest: unknown }).digest).startsWith("NEXT_REDIRECT")
    ) {
      throw err;
    }
    return {
      data: [],
      error:
        err instanceof Error
          ? err.message
          : "No se pudo conectar con el backend",
    };
  }
}

const estadoBadge: Record<
  EstadoPropietario,
  { variant: "success" | "warning" | "secondary"; label: string }
> = {
  activo: { variant: "success", label: "Activo" },
  pausado: { variant: "warning", label: "Pausado" },
  baja: { variant: "secondary", label: "Baja" },
};

export default async function PropietariosPage() {
  const { data, error } = await safeList();

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Propietarios</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Personas dueñas de los pisos que gestionamos.
          </p>
        </div>
        <NuevoPropietarioDialog />
      </div>

      {error && (
        <div className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          No se pudo cargar la lista: {error}
        </div>
      )}

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Pisos</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-[60px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 && !error && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-12">
                  Aún no hay propietarios. Crea el primero con el botón de arriba.
                </TableCell>
              </TableRow>
            )}
            {data.map((p) => {
              const badge = estadoBadge[p.estado];
              return (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">
                    <Link
                      href={`/admin/propietarios/${p.id}`}
                      className="hover:underline underline-offset-4"
                    >
                      {p.nombre}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {p.telefono ?? "—"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {p.email ?? "—"}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {p.pisosCount}
                  </TableCell>
                  <TableCell>
                    <Badge variant={badge.variant}>{badge.label}</Badge>
                  </TableCell>
                  <TableCell>
                    <PropietariosRowActions propietario={p} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
