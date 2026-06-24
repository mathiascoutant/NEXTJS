import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  formatPrice,
  getProductPath,
  isInStock,
  type Product,
} from "@domains/catalog/entity/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={getProductPath(product.slug)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-pitch-900/50 transition-all duration-200 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-lg hover:shadow-gold-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400"
    >
      <div className="relative aspect-square overflow-hidden bg-pitch-800">
        <Image
          src={product.images.main}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {!isInStock(product) && (
          <div className="absolute left-3 top-3">
            <Badge>Rupture</Badge>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-gold-400">
          {product.category}
        </p>
        <h2 className="text-lg font-semibold leading-snug text-white group-hover:text-gold-300">
          {product.name}
        </h2>
        <p className="line-clamp-2 flex-1 text-sm text-pitch-300">
          {product.description}
        </p>
        <p className="text-lg font-bold text-white">
          {formatPrice(product.price, product.currency)}
        </p>
      </div>
    </Link>
  );
}
