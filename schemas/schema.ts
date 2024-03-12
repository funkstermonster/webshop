import { z } from "zod";

export const registerFormSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required!" })
      .email({ message: "Not a valid email" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password is too short - should be 6 chars minimum." })
      .max(12, {
        message: "Password is too long - should be at least 12 chars long",
      }),
    confirmPassword: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password is too short - should be 6 chars minimum." })
      .max(12, {
        message: "Password is too long - should be at least 12 chars long",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const loginFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required!" })
    .email({ message: "Not a valid email!" }),
  password: z.string({ required_error: "Password is required!" }),
});

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const MAX_IMAGE_SIZE = 5000000;

export const productFormSchema = z.object({
  name: z.string({ required_error: "Name is required!" }),
  price: z.string({ required_error: "Price is required!" }),
  description: z.string({ required_error: "Description is required!" }),
  image: z
    .any()
    .refine(
      (files) => files?.[0]?.size <= MAX_IMAGE_SIZE,
      `Max image size is 4MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});
