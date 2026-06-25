import { cookies } from "next/headers";
import { randomUUID } from "crypto";

export const CART_COOKIE_NAME = "cart-session-id";

export async function getCartSessionId(): Promise<string> {
  const cookieStore = await cookies();
  const existing = cookieStore.get(CART_COOKIE_NAME)?.value;

  if (existing) {
    return existing;
  }

  return randomUUID();
}

export async function readCartSessionId(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(CART_COOKIE_NAME)?.value ?? null;
}
