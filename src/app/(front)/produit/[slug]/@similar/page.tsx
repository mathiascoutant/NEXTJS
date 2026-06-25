import { SimilarProductsSection } from "@/components/product/similar-products-section";
import { getProductBySlug } from "@domains/catalog/repository/productRepository";
import { notFound } from "next/navigation";

type SimilarSlotProps = {
  params: Promise<{ slug: string }>;
};

export default async function SimilarSlot({ params }: SimilarSlotProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <SimilarProductsSection productId={product.id} />;
}
