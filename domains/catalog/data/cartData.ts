import { prisma } from "@/lib/prisma";
import type { Product, ProductImages, ProductSpecs } from "@domains/catalog/entity/product";

type ProductRow = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  stock: number;
  sku: string;
  category: string;
  brand: string;
  images: unknown;
  specs: unknown;
};

export type CartSummaryItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  quantity: number;
};

function mapRowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    price: row.price,
    currency: row.currency,
    stock: row.stock,
    sku: row.sku,
    category: row.category,
    brand: row.brand,
    images: row.images as ProductImages,
    specs: row.specs as ProductSpecs,
  };
}

export async function findOrCreateCart(sessionId: string) {
  return prisma.cart.upsert({
    where: { sessionId },
    create: { sessionId },
    update: {},
  });
}

export async function addProductToCart(
  sessionId: string,
  productId: string,
  quantity = 1,
) {
  const cart = await findOrCreateCart(sessionId);

  await prisma.cartItem.upsert({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
    create: {
      cartId: cart.id,
      productId,
      quantity,
    },
    update: {
      quantity: { increment: quantity },
    },
  });

  return cart.id;
}

export async function findCartItemsBySession(
  sessionId: string,
): Promise<CartSummaryItem[]> {
  const cart = await prisma.cart.findUnique({
    where: { sessionId },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  if (!cart) {
    return [];
  }

  return cart.items.map((item) => ({
    productId: item.productId,
    slug: item.product.slug,
    name: item.product.name,
    price: item.product.price,
    currency: item.product.currency,
    image: (item.product.images as ProductImages).main,
    quantity: item.quantity,
  }));
}

export async function findSimilarProducts(
  productId: string,
  limit = 4,
): Promise<Product[]> {
  const rows = await prisma.productSimilarity.findMany({
    where: { productId },
    take: limit,
    include: { similar: true },
  });

  if (rows.length > 0) {
    return rows.map((row) => mapRowToProduct(row.similar));
  }

  const source = await prisma.product.findUnique({
    where: { id: productId },
    select: { category: true },
  });

  if (!source) {
    return [];
  }

  const fallback = await prisma.product.findMany({
    where: {
      category: source.category,
      id: { not: productId },
    },
    take: limit,
  });

  return fallback.map(mapRowToProduct);
}
