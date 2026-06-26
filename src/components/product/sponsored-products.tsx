import Image from "next/image";
import { RefreshSponsoredButton } from "@/components/product/refresh-sponsored-button";
import { PrefetchLink } from "@/components/navigation/prefetch-link";
import type { PrefetchMode } from "@/lib/ab-testing";
import {
  fetchSponsoredProducts,
  getSponsoredProductPath,
  type SponsoredProduct,
} from "@/lib/graphql-store";
import { formatPrice } from "@domains/catalog/entity/product";

type SponsoredProductsProps = {
  products: SponsoredProduct[];
  showRefresh?: boolean;
  prefetchMode?: PrefetchMode;
};

export function SponsoredProducts({
  products,
  showRefresh = false,
  prefetchMode = "default",
}: SponsoredProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section
      className="border-t border-white/10 py-12"
      aria-labelledby="sponsored-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-400">
              Sélection partenaire
            </p>
            <h2
              id="sponsored-heading"
              className="font-display text-2xl uppercase tracking-wide text-white"
            >
              Recommandations
            </h2>
          </div>
          {showRefresh ? <RefreshSponsoredButton /> : null}
        </div>
        <SponsoredProductGrid products={products} prefetchMode={prefetchMode} />
      </div>
    </section>
  );
}

export function SponsoredProductGrid({
  products,
  prefetchMode = "default",
}: {
  products: SponsoredProduct[];
  prefetchMode?: PrefetchMode;
}) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <li key={product.id}>
          <PrefetchLink
            href={getSponsoredProductPath(product.handle)}
            prefetchMode={prefetchMode}
            className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-pitch-900/40 transition-colors hover:border-gold-500/40"
          >
            <div className="relative aspect-video overflow-hidden bg-pitch-800">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-pitch-400">
                  Sans image
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4">
              <h3 className="font-medium text-white">{product.title}</h3>
              <p className="line-clamp-2 text-sm text-pitch-300">
                {product.description}
              </p>
              <p className="mt-auto text-sm font-semibold text-gold-400">
                {formatPrice(product.price, product.currency)}
              </p>
            </div>
          </PrefetchLink>
        </li>
      ))}
    </ul>
  );
}

export function SponsoredProductsSkeleton() {
  return (
    <section className="border-t border-white/10 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 h-8 w-56 animate-pulse rounded bg-pitch-800" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="aspect-[4/3] animate-pulse rounded-xl bg-pitch-800"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export async function loadSponsoredProducts(limit = 6) {
  return fetchSponsoredProducts(limit);
}
