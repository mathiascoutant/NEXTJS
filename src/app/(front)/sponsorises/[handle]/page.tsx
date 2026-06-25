import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  fetchSponsoredProductByHandle,
  fetchSponsoredProducts,
} from "@/lib/graphql-store";
import { formatPrice } from "@domains/catalog/entity/product";
import type { Metadata } from "next";

type SponsoredProductPageProps = {
  params: Promise<{ handle: string }>;
};

export async function generateStaticParams() {
  const products = await fetchSponsoredProducts(12);
  return products.map((product) => ({ handle: product.handle }));
}

export async function generateMetadata({
  params,
}: SponsoredProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await fetchSponsoredProductByHandle(handle);

  if (!product) {
    return { title: "Produit sponsorisé introuvable" };
  }

  return {
    title: `${product.title} (sponsorisé)`,
    description: product.description,
  };
}

export default async function SponsoredProductPage({
  params,
}: SponsoredProductPageProps) {
  const { handle } = await params;
  const product = await fetchSponsoredProductByHandle(handle);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Button href="/sponsorises" variant="ghost">
          ← Retour aux produits sponsorisés
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-pitch-800">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          ) : null}
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-gold-400">
              Partenaire officiel
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {product.title}
            </h1>
            <p className="mt-4 text-2xl font-bold text-white">
              {formatPrice(product.price, product.currency)}
            </p>
          </div>
          <p className="text-base leading-relaxed text-pitch-200">
            {product.description}
          </p>
          <p className="rounded-lg border border-white/10 bg-pitch-900/40 px-4 py-3 text-sm text-pitch-300">
            Ce produit est proposé par un partenaire externe et n&apos;est pas
            disponible à l&apos;achat sur My Supa Store.
          </p>
          <Link
            href="/"
            className="inline-flex min-h-11 w-fit items-center justify-center rounded-lg border border-white/20 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:border-gold-500/50"
          >
            Voir la boutique principale
          </Link>
        </div>
      </div>
    </div>
  );
}
