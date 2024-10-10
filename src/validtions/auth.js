import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z.string().min(1, "Name is required").trim(),
    email: z.string().email({ message: "Please enter a valid email" }).trim(),
    password: z
      .string()
      .trim()
      .min(1, { message: "Password is required" })
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }).trim(),
  password: z.string().trim().min(1, { message: "Password is required" }),
});

export const twoFactorSchema = z.object({
  twoFactorCode: z.string().length(6, "Two-factor code must be 6 digits"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }).trim(),
});

export const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .trim()
      .min(1, { message: "current Password is required" }),
    password: z
      .string()
      .trim()
      .min(1, { message: "Password is required" })
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(1, { message: "Password is required" })
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export const updateProfileSchema = z.object({
  fullName: z.string().min(1, "Name is required").trim(),
  email: z.string().email({ message: "Please enter a valid email" }).trim(),
});
