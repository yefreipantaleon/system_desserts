import { isAxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CartIcon from "../components/CartIcon";
import CategoryBadge from "../components/CategoryBadge";
import ConfirmDialog from "../components/ConfirmDialog";
import QuantityStepper from "../components/QuantityStepper";
import StateMessage from "../components/StateMessage";
import { useDeleteProduct } from "../hooks/useProductsMutations";
import { useProduct } from "../hooks/useProductsQueries";
import { useCartStore } from "../stores/cartStore";
import NotFoundPage from "./NotFoundPage";

function BackLink() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-1 text-sm font-medium text-[#7a685f] transition-colors hover:text-[#b84214]"
    >
      ← Volver a los postres
    </Link>
  );
}

function DetailSkeleton() {
  return (
    <div aria-hidden="true" className="mt-6 grid animate-pulse gap-8 md:grid-cols-2">
      <div className="aspect-[4/3] w-full rounded-xl bg-[#ede3da]" />
      <div className="flex flex-col gap-4">
        <div className="h-3 w-24 rounded bg-[#ede3da]" />
        <div className="h-8 w-3/4 rounded bg-[#ede3da]" />
        <div className="h-6 w-20 rounded bg-[#ede3da]" />
        <div className="h-4 w-full rounded bg-[#ede3da]" />
        <div className="h-4 w-5/6 rounded bg-[#ede3da]" />
        <div className="mt-4 h-11 w-48 rounded-full bg-[#ede3da]" />
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data: product, isPending, isError, error, refetch } = useProduct(id);
  const deleteMutation = useDeleteProduct();

  const quantity = useCartStore((state) => state.items.find((item) => item.id === id)?.quantity ?? 0);
  const addItem = useCartStore((state) => state.addItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  if (isError && isAxiosError(error) && error.response?.status === 404) {
    return <NotFoundPage message="El producto que buscas no existe o fue eliminado." />;
  }

  const handleDelete = () => {
    if (!product) return;
    deleteMutation.mutate(product.id, {
      onSuccess: () => navigate("/"),
      onSettled: () => setIsDeleteOpen(false),
    });
  };

  return (
    <div className="mt-8">
      <BackLink />

      {isPending && <DetailSkeleton />}

      {isError && (
        <div className="mt-6 grid">
          <StateMessage
            icon="⚠️"
            title="No pudimos cargar el producto"
            description="Verifica que la API esté corriendo e inténtalo de nuevo."
            actionLabel="Reintentar"
            onAction={() => refetch()}
          />
        </div>
      )}

      {product && (
        <>
          <article className="mt-6 grid gap-8 md:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-[#ede3da] bg-white">
              <img src={product.image} alt={product.name} className="aspect-[4/3] w-full object-cover" />
            </div>

            <div className="flex flex-col">
              <CategoryBadge categoryId={product.categoryId} />
              <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#26160e]">{product.name}</h1>
              <p className="mt-3 text-2xl font-bold text-[#b84214]">${product.price.toFixed(2)}</p>
              <p className="mt-4 leading-relaxed text-[#7a685f]">{product.description}</p>

              <div className="mt-6">
                {quantity > 0 ? (
                  <QuantityStepper
                    quantity={quantity}
                    onIncrease={() => increaseQuantity(product.id)}
                    onDecrease={() => decreaseQuantity(product.id)}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => addItem(product)}
                    className="flex w-fit cursor-pointer items-center justify-center gap-2 rounded-full border border-[#e3d6ca] bg-white px-6 py-2.5 text-sm font-semibold text-[#26160e] transition-colors hover:border-[#b84214] hover:text-[#b84214]"
                  >
                    <CartIcon />
                    Añadir al Carrito
                  </button>
                )}
              </div>

              <div className="mt-8 flex gap-3 border-t border-[#ede3da] pt-6">
                <Link
                  to={`/producto/${product.id}/editar`}
                  className="rounded-full border border-[#e3d6ca] bg-white px-5 py-2 text-sm font-semibold text-[#26160e] transition-colors hover:border-[#b84214] hover:text-[#b84214]"
                >
                  Editar
                </Link>
                <button
                  type="button"
                  onClick={() => setIsDeleteOpen(true)}
                  className="cursor-pointer rounded-full border border-[#e3d6ca] bg-white px-5 py-2 text-sm font-semibold text-[#b84214] transition-colors hover:border-[#b84214] hover:bg-[#b84214] hover:text-white"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </article>

          <ConfirmDialog
            isOpen={isDeleteOpen}
            title="¿Eliminar producto?"
            description={`Se eliminará "${product.name}" de forma permanente. Esta acción no se puede deshacer.`}
            confirmLabel="Eliminar"
            isLoading={deleteMutation.isPending}
            onConfirm={handleDelete}
            onCancel={() => setIsDeleteOpen(false)}
          />
        </>
      )}
    </div>
  );
}