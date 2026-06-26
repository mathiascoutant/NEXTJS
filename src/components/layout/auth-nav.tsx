import Link from "next/link";
import { auth } from "@/auth";
import { logoutAction } from "@/app/actions/auth";
import { getTrigram } from "@/lib/user-display";

export async function AuthNav() {
  const session = await auth();

  if (!session?.user) {
    return (
      <Link
        href="/connexion"
        className="inline-flex min-h-11 items-center rounded-lg px-3 py-2 text-sm font-medium text-pitch-100 transition-colors hover:bg-white/10 hover:text-white"
      >
        Connexion
      </Link>
    );
  }

  const trigram = getTrigram(session.user.name ?? session.user.email ?? "?");

  return (
    <div className="flex items-center gap-2">
      {session.user.role === "ADMIN" ? (
        <Link
          href="/admin"
          className="inline-flex min-h-11 items-center rounded-lg px-3 py-2 text-sm font-medium text-pitch-100 transition-colors hover:bg-white/10 hover:text-white"
        >
          Admin
        </Link>
      ) : null}

      <span
        className="flex h-9 w-9 items-center justify-center rounded-full bg-pitch-800 text-xs font-bold text-gold-400 ring-1 ring-white/10"
        title={session.user.name ?? undefined}
        aria-label={`Connecté en tant que ${session.user.name}`}
      >
        {trigram}
      </span>

      <form action={logoutAction}>
        <button
          type="submit"
          className="inline-flex min-h-11 items-center rounded-lg px-3 py-2 text-sm font-medium text-pitch-100 transition-colors hover:bg-white/10 hover:text-white"
        >
          Déconnexion
        </button>
      </form>
    </div>
  );
}
