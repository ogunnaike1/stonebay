import { z } from "zod";

// ── Register ─────────────────────────────────────────────
export const RegisterSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name is too long"),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name is too long"),

  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),

    role: z.enum(["BUYER", "SELLER"] as const),

  // Seller-only fields (optional for buyers)
  storeName: z
    .string()
    .min(2, "Store name must be at least 2 characters")
    .max(80, "Store name is too long")
    .optional(),

  phone: z
    .string()
    .regex(/^\+?[0-9\s\-()]{10,15}$/, "Please enter a valid phone number")
    .optional(),
})
// If role is SELLER, storeName and phone are required
.refine(
  (data) => {
    if (data.role === "SELLER") {
      return !!data.storeName && !!data.phone;
    }
    return true;
  },
  {
    message: "Sellers must provide a store name and phone number",
    path: ["storeName"],
  }
);

export type RegisterInput = z.infer<typeof RegisterSchema>;

// ── Login ────────────────────────────────────────────────
export const LoginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase(),

  password: z
    .string()
    .min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof LoginSchema>;