import { role } from "@/constants/role.constant";
import z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, {
        error: "Name must be at least 2 characters long.",
      })
      .max(30, { error: "Name cannot exceed 30 characters." }),
    email: z.email(),
    phone: z.string().regex(/^(?:\+?88)?01[3-9]\d{8}$/, {
      error: "Phone Number must be start with +88 or 01",
    }),
    role: z.enum([role.RIDER, role.DRIVER] as const, {
      message: "Role must be either RIDER or DRIVER",
    }),

    password: z
      .string()
      .min(8, { error: "Password must be at least 8 characters long." })
      .regex(/^(?=.*[A-Z])/, {
        error: "Password must contain at least 1 uppercase character.",
      })
      .regex(/^(?=.*[a-z])/, {
        error: "Password must contain at least 1 lowercase character.",
      })
      .regex(/^(?=.*\d)/, {
        error: "Password must contain at least 1 number.",
      })
      .regex(/^(?=.*[!@#$%^&*])/, {
        error: "Password must contain at least 1 special character.",
      }),
    confirmPassword: z
      .string()
      .min(8, { error: "Confirm Password must be at least 8 characters long." })
      .regex(/^(?=.*[A-Z])/, {
        error: "Confirm Password must contain at least 1 uppercase character.",
      })
      .regex(/^(?=.*[a-z])/, {
        error: "Confirm Password must contain at least 1 lowercase character.",
      })
      .regex(/^(?=.*\d)/, {
        error: "Confirm Password must contain at least 1 number.",
      })
      .regex(/^(?=.*[!@#$%^&*])/, {
        error: "Confirm Password must contain at least 1 special character.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[A-Z])/, {
      error: "Password must contain at least 1 uppercase character.",
    })
    .regex(/^(?=.*[a-z])/, {
      error: "Password must contain at least 1 lowercase character.",
    })
    .regex(/^(?=.*\d)/, {
      error: "Password must contain at least 1 number.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      error: "Password must contain at least 1 special character.",
    }),
});

export const profileSchema = z.object({
  name: z
    .string()
    .min(2, {
      error: "Name must be at least 2 characters long.",
    })
    .max(30, { error: "Name cannot exceed 30 characters." })
    .optional(),
  phone: z
    .string()
    .regex(/^(?:\+?88)?01[3-9]\d{8}$/, {
      error: "Phone Number must be start with +88 or 01",
    })
    .optional(),
  role: z
    .enum([role.RIDER, role.DRIVER] as const, {
      message: "Role must be either RIDER or DRIVER",
    })
    .optional(),
});

export const passwordSchema = z
  .object({
    oldPassword: z.string().min(6, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
