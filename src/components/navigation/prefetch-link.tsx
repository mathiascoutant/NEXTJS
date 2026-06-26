"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { PrefetchMode } from "@/lib/ab-testing";

type PrefetchLinkProps = {
  href: string;
  prefetchMode?: PrefetchMode;
  className?: string;
  children: React.ReactNode;
};

export function PrefetchLink({
  href,
  prefetchMode = "default",
  className,
  children,
}: PrefetchLinkProps) {
  const router = useRouter();

  if (prefetchMode === "default") {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      prefetch={false}
      className={className}
      onMouseEnter={() => {
        if (prefetchMode === "hover") {
          router.prefetch(href);
        }
      }}
    >
      {children}
    </Link>
  );
}
