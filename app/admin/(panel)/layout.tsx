import { Sidebar } from "@/components/admin/sidebar";
import { Header } from "@/components/admin/header";
import { auth } from "@/lib/api/endpoints";
import type { CurrentUser } from "@/lib/api/types";

// Si la llamada al backend falla por motivos distintos a 401 (network,
// 5xx), seguimos renderizando el panel con el usuario en placeholder.
// El 401 hace que el client api lance redirect a /admin/login; lo dejamos
// propagar (Next lo detecta por el digest NEXT_REDIRECT).
async function safeMe(): Promise<CurrentUser | null> {
  try {
    return await auth.me();
  } catch (err) {
    if (
      err &&
      typeof err === "object" &&
      "digest" in err &&
      String((err as { digest: unknown }).digest).startsWith("NEXT_REDIRECT")
    ) {
      throw err;
    }
    return null;
  }
}

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await safeMe();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Header userEmail={user?.email ?? null} />
        <main className="flex-1 p-6 lg:p-8 bg-background">{children}</main>
      </div>
    </div>
  );
}
