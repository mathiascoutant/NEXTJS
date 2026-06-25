import { Suspense } from "react";
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import {
  SimilarProductsSection,
  SimilarProductsSkeleton,
} from "@/components/product/similar-products-section";
import {
  SponsoredProductsSection,
  SponsoredProductsSkeleton,
} from "@/components/product/sponsored-products-section";
import { USE_PARALLEL_ROUTES } from "@/lib/store-config";
import { getAllProductSlugs } from "@domains/catalog/data/cachedProductData";
import { getProductBySlug } from "@domains/catalog/repository/productRepository";
import type { Metadata } from "next";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Produit introuvable" };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

async function ProductStaticShell({ slug }: { slug: string }) {
  "use cache";
  cacheLife({ revalidate: 60 });

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
      <ProductGallery images={product.images} name={product.name} />
      <ProductInfo product={product} />
    </div>
  );
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <ProductStaticShell slug={slug} />

      {!USE_PARALLEL_ROUTES ? (
        <>
          <Suspense fallback={<SponsoredProductsSkeleton />}>
            <SponsoredProductsSection limit={3} />
          </Suspense>
          <Suspense fallback={<SimilarProductsSkeleton />}>
            <SimilarProductsSection slug={slug} />
          </Suspense>
        </>
      ) : null}
    </div>
  );
}
