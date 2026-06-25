import { Suspense } from "react";
import { ProductGrid } from "@/components/product/product-grid";
import {
  SponsoredProducts,
  SponsoredProductsSkeleton,
} from "@/components/product/sponsored-products";
import { loadSponsoredProducts } from "@/components/product/sponsored-products";
import { getProducts } from "@domains/catalog/repository/productRepository";

async function HomeSponsoredSection() {
  const products = await loadSponsoredProducts(6);
  return <SponsoredProducts products={products} showRefresh />;
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-pitch-900 via-pitch-950 to-pitch-900">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(255,255,255,0.3) 49px, rgba(255,255,255,0.3) 50px)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold-400">
            Collection 2024
          </p>
          <h1 className="font-display text-5xl uppercase leading-none tracking-wide text-white sm:text-7xl">
            Équipe-toi
            <br />
            <span className="text-gold-400">Comme un Pro</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-pitch-200">
            Maillots, ballons, chaussures et accessoires pour vivre votre
            passion du football.
          </p>
        </div>
      </section>

      <Suspense fallback={<SponsoredProductsSkeleton />}>
        <HomeSponsoredSection />
      </Suspense>

      <section
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
        aria-labelledby="products-heading"
      >
        <h2
          id="products-heading"
          className="mb-8 font-display text-3xl uppercase tracking-wide text-white"
        >
          Nos produits
        </h2>
        <ProductGrid products={products} />
      </section>
    </>
  );
}
