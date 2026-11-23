import { api } from "./client";
import type { Category, Product, ProductFilters } from "../types/product";

// json-server usa `name_like` como expresión regular: se escapan los caracteres especiales
const escapeRegex = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export async function getProducts({ search, category }: ProductFilters): Promise<Product[]> {
  const { data } = await api.get<Product[]>("/products", {
    params: {
      name_like: search ? escapeRegex(search) : undefined, // búsqueda por nombre en la API
      category: category || undefined, // filtro por categoría en la API
    },
  });
  return data;
}

export async function getProductById(id: string): Promise<Product> {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
}

export async function getCategories(): Promise<Category[]> {
  const { data } = await api.get<Category[]>("/categories");
  return data;
}