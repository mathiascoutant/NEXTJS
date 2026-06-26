export const AB_PREFETCH_COOKIE = "ab_prefetch";

export type AbVariant = "A" | "B";

export function resolveAbVariant(
  cookieValue: string | undefined,
  forcedParam: string | null,
): AbVariant {
  if (forcedParam === "A" || forcedParam === "B") {
    return forcedParam;
  }

  if (cookieValue === "A" || cookieValue === "B") {
    return cookieValue;
  }

  return Math.random() < 0.5 ? "A" : "B";
}

export type PrefetchMode = "default" | "none" | "hover";

export function getPrefetchMode(variant: AbVariant): PrefetchMode {
  if (variant === "B") {
    return "hover";
  }

  return "default";
}
