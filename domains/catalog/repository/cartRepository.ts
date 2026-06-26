import {
  addProductToCart,
  findCartItemsBySession,
  findSimilarProducts,
} from "@domains/catalog/data/cartData";

export async function getCartItems(sessionId: string | null) {
  if (!sessionId) {
    return [];
  }

  return findCartItemsBySession(sessionId);
}

export async function addToCart(
  sessionId: string,
  productId: string,
  quantity = 1,
) {
  return addProductToCart(sessionId, productId, quantity);
}

export async function getSimilarProducts(productId: string) {
  return findSimilarProducts(productId);
}
