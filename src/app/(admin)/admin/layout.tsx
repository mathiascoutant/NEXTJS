import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AdminDynamicShell } from "./admin-dynamic-shell";

export const metadata: Metadata = {
  title: "Administration",
  description: "Gestion des produits My Supa Store",
};

function AdminLoading() {
  return (
    <div className="flex flex-1 items-center justify-center p-6 text-slate-400">
      Chargement admin…
    </div>
  );
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <aside className="hidden w-64 shrink-0 border-r border-slate-800 bg-slate-900 p-6 lg:block">
        <Link href="/admin" className="block font-accent text-2xl text-amber-400">
          Admin
        </Link>
        <p className="mt-1 text-xs text-slate-400">My Supa Store</p>

        <nav className="mt-8 space-y-1" aria-label="Navigation admin">
          <Link
            href="/admin"
            className="block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/produits"
            className="block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            Produits
          </Link>
        </nav>

        <Link
          href="/"
          className="mt-8 inline-block text-sm text-amber-400 hover:text-amber-300"
        >
          ← Retour au site
        </Link>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="border-b border-slate-800 px-6 py-4 lg:hidden">
          <Link href="/admin" className="font-accent text-xl text-amber-400">
            Admin
          </Link>
        </header>
        <main className="flex-1 p-6">
          <Suspense fallback={<AdminLoading />}>
            <AdminDynamicShell>{children}</AdminDynamicShell>
          </Suspense>
        </main>
      </div>
    </div>
  );
}
