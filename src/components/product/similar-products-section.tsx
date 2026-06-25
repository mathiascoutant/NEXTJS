import { getProductBySlug } from "@domains/catalog/repository/productRepository";
import { getCachedSimilarProducts, simulateSlowFetch } from "@/lib/cached-compute";
import {
  SimilarProducts,
  SimilarProductsSkeleton,
} from "@/components/product/similar-products";
import { notFound } from "next/navigation";

type SimilarProductsSectionProps = {
  productId?: string;
  slug?: string;
};

export async function SimilarProductsSection({
  productId,
  slug,
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

  return <SimilarProducts products={products} />;
}

export { SimilarProductsSkeleton };
