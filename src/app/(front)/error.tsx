"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

type FrontErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function FrontError({ error, reset }: FrontErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="font-display text-6xl text-gold-400">Erreur</p>
      <h1 className="text-2xl font-bold text-white">Une erreur est survenue</h1>
      <p className="max-w-md text-pitch-300">
        {error.message || "Impossible de charger cette page pour le moment."}
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-gold-500 px-6 py-2.5 text-sm font-semibold text-pitch-950 transition-colors hover:bg-gold-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
        >
          Réessayer
        </button>
        <Button href="/" variant="secondary">
          Retour à l&apos;accueil
        </Button>
      </div>
    </div>
  );
}
