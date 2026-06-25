import {
  loadSponsoredProducts,
  SponsoredProducts,
  SponsoredProductsSkeleton,
} from "@/components/product/sponsored-products";
import { simulateSlowFetch } from "@/lib/cached-compute";

export async function SponsoredProductsSection({ limit = 3 }: { limit?: number }) {
  const products = await simulateSlowFetch(await loadSponsoredProducts(limit), 800);
  return <SponsoredProducts products={products} />;
}

export { SponsoredProductsSkeleton };
