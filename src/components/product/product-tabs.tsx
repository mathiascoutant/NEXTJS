"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Product } from "@domains/catalog/entity/product";
import { getProductPath } from "@domains/catalog/entity/product";

type ProductTabsProps = {
  product: Product;
};

type TabId = "description" | "specs";

const tabs: { id: TabId; label: string }[] = [
  { id: "description", label: "Description" },
  { id: "specs", label: "Spécifications" },
];

export function ProductTabs({ product }: ProductTabsProps) {
  const searchParams = useSearchParams();
  const activeTab = (searchParams.get("tab") as TabId) ?? "description";

  return (
    <div className="mt-8 border-t border-white/10 pt-8">
      <div
        className="flex gap-1 rounded-lg bg-pitch-900/50 p-1"
        role="tablist"
        aria-label="Informations produit"
      >
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={`${getProductPath(product.slug)}?tab=${tab.id}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`flex-1 rounded-md px-4 py-2.5 text-center text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 ${
              activeTab === tab.id
                ? "bg-gold-500 text-pitch-950"
                : "text-pitch-200 hover:bg-white/5 hover:text-white"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="mt-6" role="tabpanel">
        {activeTab === "description" ? (
          <p className="text-base leading-relaxed text-pitch-200">
            {product.description}
          </p>
        ) : (
          <dl className="grid gap-3 sm:grid-cols-2">
            {Object.entries(product.specs).map(([key, value]) => (
              <div
                key={key}
                className="rounded-lg border border-white/10 bg-pitch-900/30 px-4 py-3"
              >
                <dt className="text-xs font-medium uppercase tracking-wider text-gold-400">
                  {key}
                </dt>
                <dd className="mt-1 text-sm text-white">{String(value)}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  );
}
