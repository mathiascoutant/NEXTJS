import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductEditForm } from "./product-edit-form";
import { getProductById } from "@domains/catalog/repository/productRepository";
import { formatPrice, getProductPath } from "@domains/catalog/entity/product";

type AdminProductPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: AdminProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  return { title: product ? `Admin — ${product.name}` : "Produit introuvable" };
}

export default async function AdminProductDetailPage({
  params,
}: AdminProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Link
        href="/admin/produits"
        className="text-sm text-amber-400 hover:text-amber-300"
      >
        ← Retour à la liste
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
            <Image
              src={product.images.main}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <dl className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
              <dt className="text-xs uppercase text-slate-500">Prix actuel</dt>
              <dd className="mt-1 text-lg text-amber-400">
                {formatPrice(product.price, product.currency)}
              </dd>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
              <dt className="text-xs uppercase text-slate-500">SKU</dt>
              <dd className="mt-1 text-white">{product.sku}</dd>
            </div>
          </dl>

          <Link
            href={getProductPath(product.slug)}
            className="inline-flex min-h-11 items-center rounded-lg border border-slate-700 px-6 py-2.5 text-sm text-slate-300 hover:bg-slate-800"
          >
            Voir sur le site
          </Link>
        </div>

        <ProductEditForm product={product} />
      </div>
    </div>
  );
}
