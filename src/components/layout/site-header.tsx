import Link from "next/link";
import { Suspense } from "react";
import { CartSummary } from "@/components/cart/cart-summary";
import { Button } from "@/components/ui/button";

function CartSummaryFallback() {
  return (
    <span className="inline-flex min-h-11 items-center px-3 text-sm text-pitch-300">
      Panier…
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-pitch-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400"
        >
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500 text-sm font-black text-pitch-950"
            aria-hidden="true"
          >
            FC
          </span>
          <span className="font-accent text-2xl text-gold-400">My Supa Store</span>
        </Link>

        <nav
          className="flex items-center gap-2"
          aria-label="Navigation principale"
        >
          <Button href="/" variant="ghost">
            Boutique
          </Button>
          <Button href="/sponsorises" variant="ghost">
            Partenaires
          </Button>
          <Suspense fallback={<CartSummaryFallback />}>
            <CartSummary />
          </Suspense>
        </nav>
      </div>
    </header>
  );
}
