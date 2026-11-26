import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createProduct, deleteProduct, updateProduct } from "../services/productService";
import { getErrorMessage } from "../services/errorService";
import { useCartStore } from "../stores/cartStore";
import type { ProductInput } from "../interfaces/product";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: ProductInput) => createProduct(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Producto creado correctamente");
    },
    onError: (error) => toast.error(getErrorMessage(error, "No se pudo crear el producto")),
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProductInput }) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Producto actualizado correctamente");
    },
    onError: (error) => toast.error(getErrorMessage(error, "No se pudo actualizar el producto")),
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: ["products", "detail", id] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      useCartStore.getState().removeItem(id);
      toast.success("Producto eliminado correctamente");
    },
    onError: (error) => toast.error(getErrorMessage(error, "No se pudo eliminar el producto")),
  });
}