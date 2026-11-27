import { Link, useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { useCreateProduct } from "../hooks/useProductsMutations";
import type { ProductFormValues } from "../schemas/productSchema";

export default function ProductCreatePage() {
  const navigate = useNavigate();
  const createMutation = useCreateProduct();

  const handleSubmit = (values: ProductFormValues) => {
    createMutation.mutate(values, {
      onSuccess: (product) => navigate(`/producto/${product.id}`),
    });
  };

  return (
    <div className="mt-8 max-w-2xl">
      <Link to="/" className="text-sm font-medium text-[#7a685f] transition-colors hover:text-[#b84214]">
        ← Volver a los postres
      </Link>
      <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight text-[#26160e]">Nuevo producto</h1>

      <div className="mt-6 rounded-xl border border-[#ede3da] bg-white p-6">
        <ProductForm
          submitLabel="Crear producto"
          isSubmitting={createMutation.isPending}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/")}
        />
      </div>
    </div>
  );
}