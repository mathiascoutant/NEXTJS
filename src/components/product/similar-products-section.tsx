import { getProductBySlug } from "@domains/catalog/repository/productRepository";
import { getCachedSimilarProducts, simulateSlowFetch } from "@/lib/cached-compute";
import type { PrefetchMode } from "@/lib/ab-testing";
import {
  SimilarProducts,
  SimilarProductsSkeleton,
} from "@/components/product/similar-products";
import { notFound } from "next/navigation";

type SimilarProductsSectionProps = {
  productId?: string;
  slug?: string;
  prefetchMode?: PrefetchMode;
};

export async function SimilarProductsSection({
  productId,
  slug,
  prefetchMode = "default",
}: SimilarProductsSectionProps) {
  let resolvedId = productId;

  if (!resolvedId && slug) {
    const product = await getProductBySlug(slug);
    if (!product) {
      notFound();
    }
    resolvedId = product.id;
  }

  if (!resolvedId) {
    return null;
  }

  const products = await simulateSlowFetch(
    await getCachedSimilarProducts(resolvedId),
    1200,
  );

  return <SimilarProducts products={products} prefetchMode={prefetchMode} />;
}

export { SimilarProductsSkeleton };
