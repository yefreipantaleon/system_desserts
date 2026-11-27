import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(60, "El nombre no puede superar los 60 caracteres"),
  categoryId: z
    .number({ error: "Selecciona una categoría" })
    .int()
    .positive("Selecciona una categoría"),
  price: z
    .number({ error: "Ingresa un precio válido" })
    .positive("El precio debe ser mayor a 0")
    .max(1000, "El precio no puede superar 1000"),
  image: z
    .string()
    .trim()
    .min(1, "La imagen es obligatoria")
    .refine(
      (value) => value.startsWith("/") || /^https?:\/\//.test(value),
      "Usa una ruta (/images/waffle.jpg) o una URL que empiece con http(s)",
    ),
  description: z
    .string()
    .trim()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(300, "La descripción no puede superar los 300 caracteres"),
});

export type ProductFormValues = z.infer<typeof productSchema>;