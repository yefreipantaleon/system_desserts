import { useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import SearchBar from "../components/SearchBar";
import StateMessage from "../components/StateMessage";
import { useDebounce } from "../hooks/useDebounce";
import { useProducts } from "../hooks/useProducts";

const SKELETON_COUNT = 6;

export default function HomePage() {
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("");

  const search = useDebounce(searchInput.trim());

  const { data: products, isPending, isError, refetch } = useProducts({ search, category });

  const clearFilters = () => {
    setSearchInput("");
    setCategory("");
  };

  return (
    <div className="mt-8 pt-2">
      <h1 className="font-serif text-3xl font-bold tracking-tight text-[#26160e]">Postres</h1>
      <p className="mt-1 text-sm text-[#7a685f]">
        Preparados frescos cada mañana con mantequilla cultivada, cacao de origen único y frutas de temporada.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <SearchBar value={searchInput} onChange={setSearchInput} />
        <CategoryFilter selected={category} onSelect={setCategory} />
      </div>

      <main className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy={isPending}>
        {isPending &&
          Array.from({ length: SKELETON_COUNT }).map((_, i) => <ProductCardSkeleton key={i} />)}

        {isError && (
          <StateMessage
            icon="⚠️"
            title="No pudimos cargar los postres"
            description="Verifica que la API esté corriendo en http://localhost:3000 e inténtalo de nuevo."
            actionLabel="Reintentar"
            onAction={() => refetch()}
          />
        )}

        {products && products.length === 0 && (
          <StateMessage
            icon="🍰"
            title="No encontramos resultados"
            description="Prueba con otro nombre o cambia la categoría seleccionada."
            actionLabel="Limpiar filtros"
            onAction={clearFilters}
          />
        )}

        {products?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            selectedQuantity={product.id === 1 ? 1 : undefined}
          />
        ))}
      </main>
    </div>
  );
}