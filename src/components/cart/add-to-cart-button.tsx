"use client";

import type { Product } from "@domains/catalog/entity/product";
import { isInStock } from "@domains/catalog/entity/product";
import { CART_UPDATED_EVENT } from "@/components/cart/cart-refresh-listener";

type AddToCartButtonProps = {
  product: Product;
};

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const available = isInStock(product);

  async function handleClick() {
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id, quantity: 1 }),
    });

    window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
  }

  return (
    <button
      type="button"
      disabled={!available}
      onClick={handleClick}
      className="inline-flex min-h-11 items-center justify-center rounded-lg bg-gold-500 px-6 py-2.5 text-sm font-semibold text-pitch-950 transition-colors duration-200 hover:bg-gold-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 disabled:cursor-not-allowed disabled:opacity-50"
      aria-label={`Ajouter ${product.name} au panier`}
    >
      {available ? "Ajouter au panier" : "Rupture de stock"}
    </button>
  );
}
