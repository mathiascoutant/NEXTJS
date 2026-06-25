import { Suspense } from "react";
import {
  loadSponsoredProducts,
  SponsoredProductGrid,
  SponsoredProductsSkeleton,
} from "@/components/product/sponsored-products";
import { RefreshSponsoredButton } from "@/components/product/refresh-sponsored-button";

async function SponsoredCatalog() {
  const products = await loadSponsoredProducts(12);

  return (
    <>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-400">
            Sélection partenaire
          </p>
          <h1 className="font-display text-4xl uppercase tracking-wide text-white">
            Nos partenaires
          </h1>
          <p className="mt-2 max-w-2xl text-pitch-300">
            Découvrez une sélection de produits proposés par nos partenaires.
          </p>
        </div>
        <RefreshSponsoredButton />
      </div>
      <SponsoredProductGrid products={products} />
    </>
  );
}

export default function SponsoredPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Suspense fallback={<SponsoredProductsSkeleton />}>
        <SponsoredCatalog />
      </Suspense>
    </div>
  );
}
