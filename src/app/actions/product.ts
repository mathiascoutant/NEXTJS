"use server";

import { revalidatePath } from "next/cache";
import { updateProduct } from "@domains/catalog/repository/productRepository";
import { getProductPath } from "@domains/catalog/entity/product";

export type UpdateProductActionState = {
  success: boolean;
  message: string;
};

export async function updateProductAction(
  id: string,
  _prevState: UpdateProductActionState,
  formData: FormData,
): Promise<UpdateProductActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));
  const category = String(formData.get("category") ?? "").trim();
  const brand = String(formData.get("brand") ?? "").trim();

  if (!name || !description || !category || !brand) {
    return { success: false, message: "Tous les champs texte sont requis." };
  }

  if (Number.isNaN(price) || price < 0) {
    return { success: false, message: "Le prix doit être un nombre positif." };
  }

  if (Number.isNaN(stock) || stock < 0 || !Number.isInteger(stock)) {
    return { success: false, message: "Le stock doit être un entier positif." };
  }

  try {
    const product = await updateProduct(id, {
      name,
      description,
      price,
      stock,
      category,
      brand,
    });

    revalidatePath("/");
    revalidatePath("/admin/produits");
    revalidatePath(`/admin/produits/${id}`);
    revalidatePath(getProductPath(product.slug));

    return { success: true, message: "Produit mis à jour avec succès." };
  } catch {
    return { success: false, message: "Erreur lors de la mise à jour du produit." };
  }
}
