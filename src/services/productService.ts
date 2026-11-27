import { api } from "./clientService";
import type { PaginatedResponse, Product, ProductFilters, ProductInput } from "../interfaces/product";

export const PRODUCTS_PER_PAGE = 8;

export async function getProducts({ search, categoryId, page }: ProductFilters) {
  const { data } = await api.get<PaginatedResponse<Product>>("/products", {
    params: {
      "name:contains": search || undefined,
      categoryId: categoryId || undefined,
      _page: page,
      _per_page: PRODUCTS_PER_PAGE,
    },
  });
  return data;
}

export async function getProductById(id: string){
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
}

export async function createProduct(input: ProductInput){
  const { data } = await api.post<Product>("/products", input);
  return data;
}

export async function updateProduct(id: string, input: ProductInput) {
  const { data } = await api.put<Product>(`/products/${id}`, input);
  return data;
}

export async function deleteProduct(id: string){
  await api.delete(`/products/${id}`);
}