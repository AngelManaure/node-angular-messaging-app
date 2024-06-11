import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "Nombre de usuario requerido",
  }),
  email: z
    .string({
      required_error: "Email requerido",
    })
    .email({
      message: "Email inválido",
    }),
  description: z.string({
    required_error: "Descripción requerida",
  }).min(30, {
    message: "La descripción debe de ser de al menos 30 caracteres"
  }),
  password: z
    .string({
      required_error: "Contraseña requerida",
    })
    .min(6, {
      message: "La contraseña debe ser de al menos 6 caracteres",
    }),
});

export const loginSchema = z.object({
  username: z
    .string({
      required_error: "Nombre de usuario requerido",
    }),
  password: z
    .string({
      required_error: "Contraseña requerida",
    })
    .min(6, {
      message: "La contraseña debe ser de al menos 6 caracteres",
    }),
});