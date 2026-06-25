import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { addToCart } from "@domains/catalog/repository/cartRepository";
import { CART_COOKIE_NAME } from "@/lib/cart-session";
import { randomUUID } from "crypto";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    productId?: string;
    quantity?: number;
  };

  if (!body.productId) {
    return NextResponse.json(
      { error: "productId requis" },
      { status: 400 },
    );
  }

  const cookieStore = await cookies();
  let sessionId = cookieStore.get(CART_COOKIE_NAME)?.value;

  if (!sessionId) {
    sessionId = randomUUID();
    cookieStore.set(CART_COOKIE_NAME, sessionId, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
  }

  await addToCart(sessionId, body.productId, body.quantity ?? 1);

  return NextResponse.json({ success: true });
}
