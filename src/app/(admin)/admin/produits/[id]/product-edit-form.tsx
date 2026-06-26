"use client";

import { useActionState } from "react";
import {
  updateProductAction,
  type UpdateProductActionState,
} from "@/app/actions/product";
import type { Product } from "@domains/catalog/entity/product";

type ProductEditFormProps = {
  product: Product;
};

const initialState: UpdateProductActionState = {
  success: false,
  message: "",
};

export function ProductEditForm({ product }: ProductEditFormProps) {
  const [state, formAction, isPending] = useActionState(
    updateProductAction.bind(null, product.id),
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-lg font-semibold text-white">Modifier le produit</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5 sm:col-span-2">
          <span className="text-xs font-medium uppercase text-slate-400">Nom</span>
          <input
            type="text"
            name="name"
            defaultValue={product.name}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
          />
        </label>

        <label className="block space-y-1.5 sm:col-span-2">
          <span className="text-xs font-medium uppercase text-slate-400">
            Description
          </span>
          <textarea
            name="description"
            defaultValue={product.description}
            required
            rows={3}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-xs font-medium uppercase text-slate-400">Prix</span>
          <input
            type="number"
            name="price"
            defaultValue={product.price}
            min={0}
            step={0.01}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-xs font-medium uppercase text-slate-400">Stock</span>
          <input
            type="number"
            name="stock"
            defaultValue={product.stock}
            min={0}
            step={1}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-xs font-medium uppercase text-slate-400">
            Catégorie
          </span>
          <input
            type="text"
            name="category"
            defaultValue={product.category}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-xs font-medium uppercase text-slate-400">Marque</span>
          <input
            type="text"
            name="brand"
            defaultValue={product.brand}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
          />
        </label>
      </div>

      {state.message ? (
        <p
          className={`text-sm ${state.success ? "text-emerald-400" : "text-red-400"}`}
          role="status"
        >
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          name="intent"
          value="save"
          disabled={isPending}
          className="inline-flex min-h-11 items-center rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-slate-950 hover:bg-amber-400 disabled:opacity-50"
        >
          {isPending ? "Enregistrement…" : "Enregistrer"}
        </button>

        <button
          type="submit"
          name="intent"
          value="error-test"
          disabled={isPending}
          className="inline-flex min-h-11 items-center rounded-lg border border-red-500/40 px-6 py-2.5 text-sm font-medium text-red-300 hover:bg-red-500/10 disabled:opacity-50"
        >
          Tester une erreur
        </button>
      </div>
    </form>
  );
}
