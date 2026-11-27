import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { getCategories } from "../services/categoryService";
import { getProductById, getProducts } from "../services/productService";
import type { ProductFilters } from "../interfaces/product";

export function useProducts(filters: ProductFilters) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
  });
}

export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: ["products", "detail", id],
    queryFn: () => getProductById(id as string),
    enabled: Boolean(id),
    retry: (failureCount, error) =>
      !(isAxiosError(error) && error.response?.status === 404) && failureCount < 1,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}