import { unstable_cache } from "next/cache";
import { findAllProducts } from "@domains/catalog/data/productData";

export const getCachedCatalogProducts = unstable_cache(
  async () => {
    if (process.env.NODE_ENV === "development") {
      console.log("[catalog] chargement produits (cache miss)");
    }

    return findAllProducts();
  },
  ["catalog-products"],
  { revalidate: 3600, tags: ["catalog-products"] },
);
