import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { getCategories, getProductById, getProducts } from "../api/product";
import type { ProductFilters } from "../types/product";

// Query key base: ['products']. Los filtros se agregan para que cada búsqueda tenga su propio caché.
export function useProducts(filters: ProductFilters) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
  });
}

export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id as string),
    enabled: Boolean(id),
    // Si el producto no existe (404) no tiene sentido reintentar
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