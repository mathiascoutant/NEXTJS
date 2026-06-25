import { connection } from "next/server";

export async function AdminDynamicShell({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();
  return children;
}
