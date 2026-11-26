import { isAxiosError } from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import StateMessage from "../components/StateMessage";
import { useUpdateProduct } from "../hooks/useProductsMutations";
import { useProduct } from "../hooks/useProductsQueries";
import type { ProductFormValues } from "../schemas/productSchema";
import NotFoundPage from "./NotFoundPage";

export default function ProductEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: product, isPending, isError, error, refetch } = useProduct(id);
  const updateMutation = useUpdateProduct();

  if (isError && isAxiosError(error) && error.response?.status === 404) {
    return <NotFoundPage message="El producto que quieres editar no existe." />;
  }

  const handleSubmit = (values: ProductFormValues) => {
    if (!id) return;
    updateMutation.mutate(
      { id, data: values },
      { onSuccess: () => navigate(`/producto/${id}`) },
    );
  };

  return (
    <div className="mt-8 max-w-2xl">
      <Link
        to={id ? `/producto/${id}` : "/"}
        className="text-sm font-medium text-[#7a685f] transition-colors hover:text-[#b84214]"
      >
        ← Volver al detalle
      </Link>
      <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight text-[#26160e]">Editar producto</h1>

      <div className="mt-6 rounded-xl border border-[#ede3da] bg-white p-6">
        {isPending && (
          <div aria-hidden="true" className="flex animate-pulse flex-col gap-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 w-full rounded-xl bg-[#ede3da]" />
            ))}
          </div>
        )}

        {isError && (
          <StateMessage
            icon="⚠️"
            title="No pudimos cargar el producto"
            description="Verifica que la API esté corriendo e inténtalo de nuevo."
            actionLabel="Reintentar"
            onAction={() => refetch()}
          />
        )}

        {product && (
          <ProductForm
            defaultValues={{
              name: product.name,
              categoryId: product.categoryId,
              price: product.price,
              image: product.image,
              description: product.description,
            }}
            submitLabel="Guardar cambios"
            isSubmitting={updateMutation.isPending}
            onSubmit={handleSubmit}
            onCancel={() => navigate(`/producto/${product.id}`)}
          />
        )}
      </div>
    </div>
  );
}