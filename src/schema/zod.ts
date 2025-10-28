import {z} from "zod";

export const signInSchema = z.object({
  email: z.email({message: "Invalid email"})
    .min(1, {message: "Email is required"}),
  password: z.string()
    .min(1, {message: "Password is required"})
    .min(6, {message: "Password must be more than 6 characters"})
    .max(32, {message: "Password must be less than 32 characters"})
});

export const ingredientSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  category: z.enum([
    "VEGETABLES",
    "FRUITS",
    "MEAT",
    "DAIRY",
    "SPICES",
    "OTHER"
  ]),
  unit: z.enum(["GRAMS", "KILOGRAMS", "LITERS", "MILLILITERS", "PIECES"]),
  pricePerUnit: z.number({
    error: (issue) => {
      if (issue.code === 'invalid_type' && issue.received !== 'undefined') {
        return "Цена должна быть числом";
      }
      return undefined;
    }
  })
    .min(0, "Цена должна быть положительной")
    .nullable(),
  description: z.string().optional(),
});

