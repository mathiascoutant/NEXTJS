import Link from "next/link";
import { readCartSessionId } from "@/lib/cart-session";
import { getCartItems } from "@domains/catalog/repository/cartRepository";
import {
  formatPrice,
  getTotalArticles,
  getTotalPrice,
} from "@domains/catalog/entity/product";

export async function CartSummary() {
  const sessionId = await readCartSessionId();
  const items = await getCartItems(sessionId);
  const totalArticles = getTotalArticles(items);
  const totalPrice = getTotalPrice(items);

  return (
    <Link
      href="/"
      className="relative flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-pitch-100 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
      aria-label={`Panier : ${totalArticles} article${totalArticles > 1 ? "s" : ""}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M6 6h15l-1.5 9h-12z" />
        <circle cx="9" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
        <path d="M6 6L5 3H2" />
      </svg>
      <span className="hidden sm:inline">
        {totalArticles > 0
          ? `${totalArticles} · ${formatPrice(totalPrice)}`
          : "Panier"}
      </span>
      {totalArticles > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-500 px-1 text-xs font-bold text-pitch-950 sm:hidden">
          {totalArticles}
        </span>
      )}
      {items.length > 0 && (
        <span className="sr-only">
          Contenu : {items.map((item) => item.name).join(", ")}
        </span>
      )}
    </Link>
  );
}
