import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";
import products from "../domains/catalog/data/products.json";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });

const similarPairs: [string, string][] = [
  ["prod-1", "prod-2"],
  ["prod-1", "prod-5"],
  ["prod-2", "prod-1"],
  ["prod-2", "prod-5"],
  ["prod-3", "prod-4"],
  ["prod-3", "prod-6"],
  ["prod-4", "prod-3"],
  ["prod-4", "prod-6"],
  ["prod-5", "prod-1"],
  ["prod-5", "prod-2"],
  ["prod-6", "prod-3"],
  ["prod-6", "prod-4"],
];

async function main() {
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.productSimilarity.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  const adminPassword = await bcrypt.hash("admin123", 10);
  const userPassword = await bcrypt.hash("user123", 10);

  await prisma.user.createMany({
    data: [
      {
        email: "admin@supastore.fr",
        name: "Admin Store",
        password: adminPassword,
        role: "ADMIN",
      },
      {
        email: "fan@supastore.fr",
        name: "Jean Dupont",
        password: userPassword,
        role: "USER",
      },
    ],
  });

  for (const product of products) {
    await prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        currency: product.currency,
        stock: product.stock,
        sku: product.sku,
        category: product.category,
        brand: product.brand,
        images: product.images,
        specs: product.specs,
      },
    });
  }

  for (const [productId, similarId] of similarPairs) {
    await prisma.productSimilarity.create({
      data: { productId, similarId },
    });
  }

  console.log(`Seeded ${products.length} products, ${similarPairs.length} similar links, 2 users.`);
  console.log("Admin : admin@supastore.fr / admin123");
  console.log("User  : fan@supastore.fr / user123");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
