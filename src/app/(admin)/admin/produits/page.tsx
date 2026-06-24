import Link from "next/link";
import { getProducts } from "@domains/catalog/repository/productRepository";
import { formatPrice } from "@domains/catalog/entity/product";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Produits</h1>
        <p className="mt-2 text-slate-400">
          Liste des produits depuis Prisma (RSC).
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-slate-800 bg-slate-900">
            <tr>
              <th className="px-4 py-3 font-medium text-slate-400">Nom</th>
              <th className="px-4 py-3 font-medium text-slate-400">SKU</th>
              <th className="px-4 py-3 font-medium text-slate-400">Catégorie</th>
              <th className="px-4 py-3 font-medium text-slate-400">Prix</th>
              <th className="px-4 py-3 font-medium text-slate-400">Stock</th>
              <th className="px-4 py-3 font-medium text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-slate-800/50 hover:bg-slate-900/50"
              >
                <td className="px-4 py-3 font-medium text-white">
                  {product.name}
                </td>
                <td className="px-4 py-3 text-slate-400">{product.sku}</td>
                <td className="px-4 py-3 text-slate-400">{product.category}</td>
                <td className="px-4 py-3 text-slate-300">
                  {formatPrice(product.price, product.currency)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={
                      product.stock > 0 ? "text-emerald-400" : "text-red-400"
                    }
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/produits/${product.id}`}
                    className="text-amber-400 hover:text-amber-300"
                  >
                    Voir
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
