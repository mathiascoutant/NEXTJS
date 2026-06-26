"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  loginAction,
  type AuthActionState,
} from "@/app/actions/auth";

const initialState: AuthActionState = {
  success: false,
  message: "",
};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-pitch-200">Email</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          className="w-full rounded-lg border border-white/15 bg-pitch-900 px-3 py-2.5 text-sm text-white focus:border-gold-500 focus:outline-none"
        />
      </label>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-pitch-200">Mot de passe</span>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="w-full rounded-lg border border-white/15 bg-pitch-900 px-3 py-2.5 text-sm text-white focus:border-gold-500 focus:outline-none"
        />
      </label>

      {state.message ? (
        <p className="text-sm text-red-400" role="alert">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-gold-500 px-6 py-2.5 text-sm font-semibold text-pitch-950 hover:bg-gold-400 disabled:opacity-50"
      >
        {isPending ? "Connexion…" : "Se connecter"}
      </button>

      <p className="text-center text-sm text-pitch-300">
        Pas encore de compte ?{" "}
        <Link href="/inscription" className="text-gold-400 hover:underline">
          Créer un compte
        </Link>
      </p>
    </form>
  );
}
