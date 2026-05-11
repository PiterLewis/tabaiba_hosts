"use client";

import { useTransition } from "react";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { Propietario } from "@/lib/api/types";
import { deletePropietarioAction } from "@/app/admin/(panel)/propietarios/actions";

export function PropietariosRowActions({ propietario }: { propietario: Propietario }) {
  const [pending, startTransition] = useTransition();

  const onDelete = () => {
    if (!confirm(`¿Eliminar a ${propietario.nombre}? Esta acción no se puede deshacer.`)) return;
    startTransition(async () => {
      const res = await deletePropietarioAction(propietario.id);
      if (res.ok) toast.success("Propietario eliminado");
      else toast.error(res.error ?? "No se pudo eliminar");
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" disabled={pending} aria-label="Acciones">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{propietario.nombre}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={onDelete}
          disabled={pending}
        >
          <Trash2 />
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
