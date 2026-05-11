import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/admin/(panel)/actions";

export function Header({ userEmail }: { userEmail: string | null }) {
  return (
    <header className="h-14 border-b bg-card flex items-center justify-between gap-4 px-6 sticky top-0 z-30">
      <div className="md:hidden flex items-center gap-2">
        <img src="/tabaiba-mark.svg" alt="" aria-hidden="true" className="h-6 w-6" />
        <span className="font-medium text-sm">Tabaiba · Hosts</span>
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-3">
        {userEmail && (
          <span className="text-sm text-muted-foreground hidden sm:inline">
            {userEmail}
          </span>
        )}
        <form action={logoutAction}>
          <Button type="submit" variant="ghost" size="sm">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Salir</span>
          </Button>
        </form>
      </div>
    </header>
  );
}
