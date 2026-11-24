import { api } from "./client";
import type { Category, Product, ProductFilters } from "../types/product";

const escapeRegex = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export async function getProducts({ search, category }: ProductFilters): Promise<Product[]> {
  const { data } = await api.get<Product[]>("/products", {
    params: {
      name_like: search ? escapeRegex(search) : undefined,
      category: category || undefined,
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