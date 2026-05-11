import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Dashboard "hoy" — placeholders. Conectaremos a /stats/today cuando el
// backend exponga el endpoint.

const stats = [
  {
    label: "Llegadas hoy",
    value: "—",
    hint: "check-ins programados para hoy",
  },
  {
    label: "Salidas hoy",
    value: "—",
    hint: "check-outs programados para hoy",
  },
  {
    label: "Tareas pendientes",
    value: "—",
    hint: "limpieza, mantenimiento, incidencias",
  },
  {
    label: "Mensajes sin contestar",
    value: "—",
    hint: "de huéspedes en cualquier canal",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Hoy</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Resumen de lo que pasa en los pisos ahora mismo.
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="pb-2">
              <CardDescription>{s.label}</CardDescription>
              <CardTitle className="text-3xl font-semibold">
                {s.value}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{s.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Próximas reservas</CardTitle>
            <CardDescription>
              Las 5 siguientes entradas a tus pisos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Conectaremos a <code>/reservas?upcoming=true</code> cuando el
              backend lo exponga.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Última actividad</CardTitle>
            <CardDescription>
              Mensajes, reservas y tareas creadas hoy.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Pendiente de <code>/activity?since=today</code>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
