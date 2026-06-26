import { cache } from "react";
import {
  findAllProducts,
  findAllSlugs,
  findProductById,
  findProductBySlug,
  updateProductById,
  type UpdateProductInput,
} from "@domains/catalog/data/productData";

export async function getProducts() {
  return findAllProducts();
}

export const getProductBySlug = cache(async (slug: string) => {
  return findProductBySlug(slug);
});

export async function getProductById(id: string) {
  return findProductById(id);
}

export async function getAllProductSlugs() {
  return findAllSlugs();
}

export async function updateProduct(id: string, data: UpdateProductInput) {
  return updateProductById(id, data);
}

export type { UpdateProductInput };
