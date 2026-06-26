import { prisma } from "@/lib/prisma";
import type { Role } from "@/generated/prisma/client";

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(data: {
  email: string;
  password: string;
  name: string;
  role?: Role;
}) {
  return prisma.user.create({ data });
}
