import { Suspense } from "react";
import { CartRefreshListener } from "@/components/cart/cart-refresh-listener";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function FrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CartRefreshListener />
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Suspense fallback={<footer className="mt-auto h-24 border-t border-white/10 bg-pitch-950" />}>
        <SiteFooter />
      </Suspense>
    </>
  );
}
