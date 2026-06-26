"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { updateProduct } from "@domains/catalog/repository/productRepository";
import { getProductPath } from "@domains/catalog/entity/product";

export type UpdateProductActionState = {
  success: boolean;
  message: string;
};

const updateProductSchema = z.object({
  name: z.string().trim().min(1, "Le nom est requis."),
  description: z.string().trim().min(1, "La description est requise."),
  price: z.coerce.number().min(0, "Le prix doit être positif."),
  stock: z.coerce.number().int().min(0, "Le stock doit être un entier positif."),
  category: z.string().trim().min(1, "La catégorie est requise."),
  brand: z.string().trim().min(1, "La marque est requise."),
});

export async function updateProductAction(
  id: string,
  _prevState: UpdateProductActionState,
  formData: FormData,
): Promise<UpdateProductActionState> {
  const intent = String(formData.get("intent") ?? "save");

  if (intent === "error-test") {
    return {
      success: false,
      message: "Échec simulé : impossible de mettre à jour le produit.",
    };
  }

  const parsed = updateProductSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    category: formData.get("category"),
    brand: formData.get("brand"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Données invalides.",
    };
  }

  try {
    const product = await updateProduct(id, parsed.data);

    revalidateTag("catalog-products", "max");
    revalidatePath("/");
    revalidatePath("/admin/produits");
    revalidatePath(`/admin/produits/${id}`);
    revalidatePath(getProductPath(product.slug));

    return { success: true, message: "Produit enregistré." };
  } catch {
    return {
      success: false,
      message: "La mise à jour a échoué. Réessayez dans un instant.",
    };
  }
}
