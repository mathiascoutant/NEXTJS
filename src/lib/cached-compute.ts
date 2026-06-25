import { unstable_cache } from "next/cache";
import { findSimilarProducts } from "@domains/catalog/data/cartData";
import { computePrimes } from "@/lib/compute-primes";

export const getCachedSimilarProducts = unstable_cache(
  async (productId: string) => findSimilarProducts(productId),
  ["similar-products"],
  { revalidate: 3600, tags: ["similar-products"] },
);

export const getCachedPrimeStats = unstable_cache(
  async (limit: number) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`[computePrimes] calcul pour limit=${limit}`);
    }
    return computePrimes(limit);
  },
  ["prime-stats"],
  { revalidate: 3600, tags: ["prime-stats"] },
);

export async function simulateSlowFetch<T>(
  data: T,
  delayMs = 1500,
): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, delayMs));
  return data;
}
