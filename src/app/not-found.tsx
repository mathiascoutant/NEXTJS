import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="font-display text-8xl text-gold-400">404</p>
      <h1 className="text-2xl font-bold text-white">Page introuvable</h1>
      <p className="max-w-md text-pitch-300">
        Cette page n&apos;existe pas ou le produit a été retiré du catalogue.
      </p>
      <Button href="/" variant="primary">
        Retour à la boutique
      </Button>
    </div>
  );
}
