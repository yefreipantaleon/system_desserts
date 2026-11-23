import { isAxiosError } from "axios";
import { Link, useParams } from "react-router-dom";
import StateMessage from "../components/StateMessage";
import { useProduct } from "../hooks/useProducts";
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
  const { data: product, isPending, isError, error, refetch } = useProduct(id);

  if (isError && isAxiosError(error) && error.response?.status === 404) {
    return <NotFoundPage message="El producto que buscas no existe o fue eliminado." />;
  }

  return (
    <div className="mt-8">
      <BackLink />

      {isPending && <DetailSkeleton />}

      {isError && (
        <div className="mt-6 grid">
          <StateMessage
            icon="⚠️"
            title="No pudimos cargar el producto"
            description="Verifica que la API esté corriendo en http://localhost:3000 e inténtalo de nuevo."
            actionLabel="Reintentar"
            onAction={() => refetch()}
          />
        </div>
      )}

      {product && (
        <article className="mt-6 grid gap-8 md:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-[#ede3da] bg-white">
            <img src={product.image} alt={product.name} className="aspect-[4/3] w-full object-cover" />
          </div>

          <div className="flex flex-col">
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#8c6d5c]">
              {product.category}
            </p>
            <h1 className="mt-1 font-serif text-3xl font-bold tracking-tight text-[#26160e]">
              {product.name}
            </h1>
            <p className="mt-3 text-2xl font-bold text-[#b84214]">${product.price.toFixed(2)}</p>
            <p className="mt-4 leading-relaxed text-[#7a685f]">{product.description}</p>

            <button
              type="button"
              className="mt-6 flex w-fit cursor-pointer items-center justify-center gap-2 rounded-full border border-[#e3d6ca] bg-white px-6 py-2.5 text-sm font-semibold text-[#26160e] transition-colors hover:border-[#b84214] hover:text-[#b84214]"
            >
              <img src="/images/icon-add-to-cart.svg" alt="" className="h-4 w-4" />
              Añadir al Carrito
            </button>
          </div>
        </article>
      )}
    </div>
  );
}