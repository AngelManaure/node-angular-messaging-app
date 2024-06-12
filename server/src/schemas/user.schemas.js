import { z } from "zod";

export const updateUserRequestSchema = z.object({
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
  password: z
    .string({
      required_error: "Contraseña requerida",
    })
    .min(6, {
      message: "La contraseña debe ser de al menos 6 caracteres",
    }),
});

export const updateSchema = z.object({
  newUsername: z.string({
    required_error: "Nombre de usuario requerido",
  }),
  newEmail: z
    .string({
      required_error: "Email requerido",
    })
    .email({
      message: "Email inválido",
    }),
  newDescription: z.string({
    required_error: "Descripción requerida",
  }).min(30, {
    message: "La descripción debe de ser de al menos 30 caracteres"
  }),
  newPassword: z
    .string({
      required_error: "Contraseña requerida",
    })
    .min(6, {
      message: "La contraseña debe ser de al menos 6 caracteres",
    }),
});
