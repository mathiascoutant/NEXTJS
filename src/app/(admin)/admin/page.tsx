import Link from "next/link";
import { getProducts } from "@domains/catalog/repository/productRepository";
import { getCachedPrimeStats } from "@/lib/cached-compute";

export default async function AdminDashboardPage() {
  const products = await getProducts();
  const stockSum = products.reduce((total, product) => total + product.stock, 0);
  const primeLimit = Math.max(stockSum * 100, 10_000);
  const primeStats = await getCachedPrimeStats(primeLimit);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="mt-2 text-slate-400">
          Vue d&apos;ensemble de la boutique My Supa Store.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">Produits</p>
          <p className="mt-2 text-3xl font-bold text-amber-400">
            {products.length}
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">En stock</p>
          <p className="mt-2 text-3xl font-bold text-emerald-400">
            {products.filter((p) => p.stock > 0).length}
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">Catégories</p>
          <p className="mt-2 text-3xl font-bold text-white">
            {new Set(products.map((p) => p.category)).size}
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">Unités en stock</p>
          <p className="mt-2 text-3xl font-bold text-white">
            {stockSum.toLocaleString("fr-FR")}
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">Analyse catalogue</p>
          <p className="mt-2 text-3xl font-bold text-white">
            {primeStats.count.toLocaleString("fr-FR")}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Calcul lourd mis en cache (1 h)
          </p>
        </div>
      </div>

      <Link
        href="/admin/produits"
        className="inline-flex min-h-11 items-center rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-slate-950 hover:bg-amber-400"
      >
        Gérer les produits
      </Link>
    </div>
  );
}
