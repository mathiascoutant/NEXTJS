"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const CART_UPDATED_EVENT = "cart-updated";

export function CartRefreshListener() {
  const router = useRouter();

  useEffect(() => {
    function handleCartUpdated() {
      router.refresh();
    }

    window.addEventListener(CART_UPDATED_EVENT, handleCartUpdated);
    return () => window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdated);
  }, [router]);

  return null;
}
