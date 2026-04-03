import { PrismaClient, Role, ProductStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ── Categories ──────────────────────────────────────
  const categories = await Promise.all([
    prisma.category.upsert({ where: { slug: "fashion" }, update: {}, create: { name: "Fashion", slug: "fashion" } }),
    prisma.category.upsert({ where: { slug: "electronics" }, update: {}, create: { name: "Electronics", slug: "electronics" } }),
    prisma.category.upsert({ where: { slug: "home-living" }, update: {}, create: { name: "Home & Living", slug: "home-living" } }),
    prisma.category.upsert({ where: { slug: "beauty" }, update: {}, create: { name: "Beauty", slug: "beauty" } }),
    prisma.category.upsert({ where: { slug: "sports" }, update: {}, create: { name: "Sports", slug: "sports" } }),
    prisma.category.upsert({ where: { slug: "footwear" }, update: {}, create: { name: "Footwear", slug: "footwear" } }),
    prisma.category.upsert({ where: { slug: "accessories" }, update: {}, create: { name: "Accessories", slug: "accessories" } }),
  ]);

  console.log(`✅ ${categories.length} categories created`);

  // ── Admin user ───────────────────────────────────────
  const adminPassword = await bcrypt.hash("Admin@stonebay1", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@stonebay.com" },
    update: {},
    create: {
      name: "Stonebay Admin",
      email: "admin@stonebay.com",
      password: adminPassword,
      role: Role.ADMIN,
      emailVerified: new Date(),
    },
  });
  console.log(`✅ Admin: ${admin.email}`);

  // ── Seller user + store ──────────────────────────────
  const sellerPassword = await bcrypt.hash("Seller@test1", 12);
  const seller = await prisma.user.upsert({
    where: { email: "seller@stylehauslagos.com" },
    update: {},
    create: {
      name: "StyleHaus Lagos",
      email: "seller@stylehauslagos.com",
      password: sellerPassword,
      role: Role.SELLER,
      phone: "+234 801 234 5678",
      emailVerified: new Date(),
    },
  });

  const store = await prisma.store.upsert({
    where: { slug: "stylehaus-lagos" },
    update: {},
    create: {
      userId: seller.id,
      name: "StyleHaus Lagos",
      slug: "stylehaus-lagos",
      tagline: "Premium African fashion for every occasion",
      description: "We create and curate the finest Ankara and African print fashion pieces.",
      city: "Lagos",
      state: "Lagos State",
      category: "Fashion",
      isVerified: true,
    },
  });
  console.log(`✅ Seller: ${seller.email} → Store: ${store.name}`);

  // ── Buyer user ───────────────────────────────────────
  const buyerPassword = await bcrypt.hash("Buyer@test1", 12);
  const buyer = await prisma.user.upsert({
    where: { email: "buyer@test.com" },
    update: {},
    create: {
      name: "Adeola Kamara",
      email: "buyer@test.com",
      password: buyerPassword,
      role: Role.BUYER,
      phone: "+234 802 345 6789",
      emailVerified: new Date(),
    },
  });
  console.log(`✅ Buyer: ${buyer.email}`);

  // ── Products ─────────────────────────────────────────
  const fashionCat = categories.find((c) => c.slug === "fashion")!;

  const products = await Promise.all([
    prisma.product.upsert({
      where: { slug: "premium-ankara-print-dress" },
      update: {},
      create: {
        storeId: store.id,
        categoryId: fashionCat.id,
        name: "Premium Ankara Print Dress",
        slug: "premium-ankara-print-dress",
        description: "Beautifully crafted Ankara print dress made from premium Dutch wax fabric.",
        price: 1850000, // ₦18,500 in kobo
        comparePrice: 2400000,
        sku: "SKU-001",
        stock: 32,
        status: ProductStatus.ACTIVE,
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        tags: ["ankara", "dress", "fashion", "wax"],
        totalSold: 128,
      },
    }),
    prisma.product.upsert({
      where: { slug: "mens-premium-agbada-set" },
      update: {},
      create: {
        storeId: store.id,
        categoryId: fashionCat.id,
        name: "Men's Premium Agbada Set",
        slug: "mens-premium-agbada-set",
        description: "Exquisitely embroidered Agbada set for the modern African gentleman.",
        price: 2200000,
        sku: "SKU-002",
        stock: 4,
        status: ProductStatus.ACTIVE,
        sizes: ["M", "L", "XL", "XXL"],
        tags: ["agbada", "men", "fashion", "traditional"],
        totalSold: 64,
      },
    }),
  ]);

  console.log(`✅ ${products.length} products created`);

  // ── Buyer address ────────────────────────────────────
  await prisma.address.upsert({
    where: { id: "seed-address-1" },
    update: {},
    create: {
      id: "seed-address-1",
      userId: buyer.id,
      label: "Home",
      fullName: "Adeola Kamara",
      phone: "+234 801 234 5678",
      street: "15 Admiralty Way, Lekki Phase 1",
      city: "Lagos",
      state: "Lagos State",
      isDefault: true,
    },
  });

  console.log("✅ Address created");
  console.log("\n🎉 Seed complete!\n");
  console.log("Test accounts:");
  console.log("  Admin:  admin@stonebay.com     / Admin@stonebay1");
  console.log("  Seller: seller@stylehauslagos.com / Seller@test1");
  console.log("  Buyer:  buyer@test.com         / Buyer@test1\n");
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });