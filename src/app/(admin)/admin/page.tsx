import Link from "next/link";
import { getProducts } from "@domains/catalog/repository/productRepository";

export default async function AdminDashboardPage() {
  const products = await getProducts();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="mt-2 text-slate-400">
          Vue d&apos;ensemble de la boutique My Supa Store.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
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
