import { Suspense } from "react";
import { USE_PARALLEL_ROUTES } from "@/lib/store-config";

type ProductLayoutProps = {
  children: React.ReactNode;
  sponsored: React.ReactNode;
  similar: React.ReactNode;
};

export default function ProductLayout({
  children,
  sponsored,
  similar,
}: ProductLayoutProps) {
  if (!USE_PARALLEL_ROUTES) {
    return children;
  }

  return (
    <>
      {children}
      <Suspense fallback={null}>{sponsored}</Suspense>
      <Suspense fallback={null}>{similar}</Suspense>
    </>
  );
}
