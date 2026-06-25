"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function refreshSponsoredProducts() {
  revalidateTag("sponsored-products", "max");
  revalidatePath("/");
  revalidatePath("/sponsorises");
}
