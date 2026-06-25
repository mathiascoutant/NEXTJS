import { cacheLife } from "next/cache";
import { getProducts } from "@domains/catalog/repository/productRepository";

async function getFooterStats() {
  "use cache";
  cacheLife("hours");

  const products = await getProducts();
  const year = new Date().getFullYear();

  return {
    year,
    productCount: products.length,
  };
}

export async function SiteFooter() {
  const { year, productCount } = await getFooterStats();

  return (
    <footer className="mt-auto border-t border-white/10 bg-pitch-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-pitch-300">
            &copy; {year} My Supa Store — Boutique de football
          </p>
          <p className="text-xs text-pitch-400">
            {productCount} produits disponibles
          </p>
        </div>
      </div>
    </footer>
  );
}
