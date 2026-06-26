import { cookies } from "next/headers";
import {
  AB_PREFETCH_COOKIE,
  getPrefetchMode,
  type PrefetchMode,
} from "@/lib/ab-testing";

export async function getLinkPrefetchMode(): Promise<PrefetchMode> {
  const cookieStore = await cookies();
  const variant = cookieStore.get(AB_PREFETCH_COOKIE)?.value;

  if (variant === "B") {
    return getPrefetchMode("B");
  }

  return "default";
}
