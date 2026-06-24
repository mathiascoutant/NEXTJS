"use client";

import { useEffect } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-fade-in">
      {children}
    </div>
  );
}

export function ErrorTrigger() {
  useEffect(() => {
    throw new Error("Erreur de test — error boundary front");
  }, []);

  return null;
}
