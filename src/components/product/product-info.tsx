import { Suspense } from "react";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { Button } from "@/components/ui/button";
import { ProductTabs } from "@/components/product/product-tabs";
import {
  formatPrice,
  isInStock,
  type Product,
} from "@domains/catalog/entity/product";

type ProductInfoProps = {
  product: Product;
};

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium uppercase tracking-wider text-gold-400">
          {product.category} · {product.brand}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {product.name}
        </h1>
        <p className="text-2xl font-bold text-white">
          {formatPrice(product.price, product.currency)}
        </p>
        <p className="text-sm text-pitch-300">
          {isInStock(product)
            ? `${product.stock} en stock · SKU ${product.sku}`
            : "Rupture de stock"}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <AddToCartButton product={product} />
        <Button href="/" variant="secondary">
          Retour à la boutique
        </Button>
      </div>

      <Suspense fallback={<div className="h-32 animate-pulse rounded-lg bg-pitch-800" />}>
        <ProductTabs product={product} />
      </Suspense>
    </div>
  );
}
