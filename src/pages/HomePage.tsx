import { useState } from "react";
import { Link } from "react-router-dom";
import CategoryFilter from "../components/CategoryFilter";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import SearchBar from "../components/SearchBar";
import StateMessage from "../components/StateMessage";
import { useProducts } from "../hooks/useProductsQueries";
import { PRODUCTS_PER_PAGE } from "../services/productService";

export default function HomePage() {
  const [searchInput, setSearchInput] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(1);

  const search = searchInput.trim();

  const { data, isPending, isError, refetch } = useProducts({ search, categoryId, page });

  const products = data?.data;
  const currentPage = data ? Math.min(page, data.last) : page;

  const handleSearch = (value: string) => {
    setSearchInput(value);
    setPage(1);
  };

  const handleCategory = (id: number) => {
    setCategoryId(id);
    setPage(1);
  };

  const clearFilters = () => {
    setSearchInput("");
    setCategoryId(0);
    setPage(1);
  };

  return (
    <div className="mt-8 pt-2">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-[#26160e]">Postres</h1>
          <p className="mt-1 text-sm text-[#7a685f]">
            Preparados frescos cada mañana con mantequilla cultivada, cacao de origen único y frutas de temporada.
          </p>
        </div>

        <Link
          to="/producto/nuevo"
          className="rounded-full bg-[#b84214] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#9a3610]"
        >
          + Nuevo producto
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <SearchBar value={searchInput} onChange={handleSearch} />
        <CategoryFilter selected={categoryId} onSelect={handleCategory} />
      </div>

      <main className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy={isPending}>
        {isPending &&
          Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => <ProductCardSkeleton key={i} />)}

        {isError && (
          <StateMessage
            icon="⚠️"
            title="No pudimos cargar los postres"
            description="Verifica que la API esté corriendo e inténtalo de nuevo."
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
          <ProductCard key={product.id} product={product} />
        ))}
      </main>

      {data && data.data.length > 0 && (
        <Pagination page={currentPage} totalPages={data.pages} onPageChange={setPage} />
      )}
    </div>
  );
}