import {
  loadSponsoredProducts,
  SponsoredProducts,
  SponsoredProductsSkeleton,
} from "@/components/product/sponsored-products";
import { simulateSlowFetch } from "@/lib/cached-compute";
import type { PrefetchMode } from "@/lib/ab-testing";

export async function SponsoredProductsSection({
  limit = 3,
  prefetchMode = "default",
}: {
  limit?: number;
  prefetchMode?: PrefetchMode;
}) {
  const products = await simulateSlowFetch(await loadSponsoredProducts(limit), 800);
  return (
    <SponsoredProducts products={products} prefetchMode={prefetchMode} />
  );
}

export { SponsoredProductsSkeleton };
