import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";
import { RegisterSchema } from "@/lib/validations/auth";

export async function POST(req: NextRequest) {
  try {
    // 1. Parse request body
    const body = await req.json();

    // 2. Validate with Zod schema
    const parsed = RegisterSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstError.message },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, password, role, storeName, phone } =
      parsed.data;

    // 3. Check if email is already registered
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists. Please sign in instead." },
        { status: 409 }
      );
    }

    // 4. Hash the password (cost factor 12 = secure but not too slow)
    const hashedPassword = await bcrypt.hash(password, 12);

    // 5. Create user + store atomically in a transaction
    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          name: `${firstName} ${lastName}`,
          email,
          password: hashedPassword,
          phone: phone ?? null,
          role: role as Role,
          emailVerified: new Date(),
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });

      // Create store if registering as seller
      if (role === "SELLER" && storeName) {
        const baseSlug = storeName
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");

        const slug = `${baseSlug}-${newUser.id.slice(0, 6)}`;

        await tx.store.create({
          data: {
            userId: newUser.id,
            name: storeName,
            slug,
            isActive: true,
            isVerified: false,
          },
        });
      }

      return newUser;
    });

    return NextResponse.json(
      { success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } },
      { status: 201 }
    );

  } catch (error) {
    console.error("[REGISTER ERROR]", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}