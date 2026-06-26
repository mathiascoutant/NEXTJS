"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { z } from "zod";
import { signIn, signOut } from "@/auth";
import { createUser, findUserByEmail } from "@domains/catalog/data/userData";

export type AuthActionState = {
  success: boolean;
  message: string;
};

const registerSchema = z.object({
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères."),
  email: z.string().trim().email("Adresse email invalide."),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères."),
});

const loginSchema = z.object({
  email: z.string().trim().email("Adresse email invalide."),
  password: z.string().min(1, "Mot de passe requis."),
});

export async function registerAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Données invalides.",
    };
  }

  const email = parsed.data.email.toLowerCase();
  const existing = await findUserByEmail(email);

  if (existing) {
    return { success: false, message: "Cet email est déjà utilisé." };
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 10);

  await createUser({
    email,
    name: parsed.data.name,
    password: passwordHash,
  });

  try {
    await signIn("credentials", {
      email,
      password: parsed.data.password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        message: "Compte créé, mais la connexion automatique a échoué.",
      };
    }

    throw error;
  }

  return { success: true, message: "" };
}

export async function loginAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Données invalides.",
    };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email.toLowerCase(),
      password: parsed.data.password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, message: "Email ou mot de passe incorrect." };
    }

    throw error;
  }

  return { success: true, message: "" };
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}
