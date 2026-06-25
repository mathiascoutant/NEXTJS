import Image from "next/image";
import Link from "next/link";
import {
  formatPrice,
  getProductPath,
  type Product,
} from "@domains/catalog/entity/product";

type SimilarProductsProps = {
  products: Product[];
};

export function SimilarProducts({ products }: SimilarProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section
      className="mt-16 border-t border-white/10 pt-12"
      aria-labelledby="similar-heading"
    >
      <h2
        id="similar-heading"
        className="mb-6 font-display text-2xl uppercase tracking-wide text-white"
      >
        Produits similaires
      </h2>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <li key={product.id}>
            <Link
              href={getProductPath(product.slug)}
              className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-pitch-900/40 transition-colors hover:border-gold-500/40"
            >
              <div className="relative aspect-square overflow-hidden bg-pitch-800">
                <Image
                  src={product.images.main}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1 p-4">
                <p className="text-xs uppercase tracking-wider text-gold-400">
                  {product.category}
                </p>
                <h3 className="font-medium text-white">{product.name}</h3>
                <p className="mt-auto text-sm font-semibold text-gold-400">
                  {formatPrice(product.price, product.currency)}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SimilarProductsSkeleton() {
  return (
    <section className="mt-16 border-t border-white/10 pt-12">
      <div className="mb-6 h-8 w-48 animate-pulse rounded bg-pitch-800" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="aspect-[4/5] animate-pulse rounded-xl bg-pitch-800"
          />
        ))}
      </div>
    </section>
  );
}
