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

export async function findAllProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    orderBy: { name: "asc" },
  });

  return rows.map(mapRowToProduct);
}

export async function findProductBySlug(slug: string): Promise<Product | null> {
  const row = await prisma.product.findUnique({
    where: { slug },
  });

  return row ? mapRowToProduct(row) : null;
}

export async function findProductById(id: string): Promise<Product | null> {
  const row = await prisma.product.findUnique({
    where: { id },
  });

  return row ? mapRowToProduct(row) : null;
}

export async function findAllSlugs(): Promise<string[]> {
  const rows = await prisma.product.findMany({
    select: { slug: true },
  });

  return rows.map((row) => row.slug);
}

export type UpdateProductInput = {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  brand: string;
};

export async function updateProductById(
  id: string,
  data: UpdateProductInput,
): Promise<Product> {
  const row = await prisma.product.update({
    where: { id },
    data,
  });

  return mapRowToProduct(row);
}
