"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Building2,
  CalendarDays,
  ListTodo,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Inicio", icon: Home, exact: true },
  { href: "/admin/propietarios", label: "Propietarios", icon: Users },
  { href: "/admin/pisos", label: "Pisos", icon: Building2 },
  { href: "/admin/calendario", label: "Calendario", icon: CalendarDays },
  { href: "/admin/tareas", label: "Tareas", icon: ListTodo },
  { href: "/admin/configuracion", label: "Configuración", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-60 shrink-0 border-r bg-cream flex-col sticky top-0 h-screen">
      <div className="p-5 flex items-center gap-2.5">
        <img
          src="/tabaiba-mark.svg"
          alt=""
          aria-hidden="true"
          className="h-7 w-7"
        />
        <span className="font-medium text-[15px] tracking-tight">
          Tabaiba<span className="text-atlantic"> · </span>Hosts
        </span>
      </div>

      <nav className="px-3 space-y-0.5 mt-2">
        {items.map(({ href, label, icon: Icon, exact }) => {
          const active = exact
            ? pathname === href
            : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                active
                  ? "bg-sand/40 text-foreground font-medium"
                  : "text-ink-soft hover:bg-cream-200 hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-4 text-[11px] text-ink-soft">
        v0.1 · interno
      </div>
    </aside>
  );
}
