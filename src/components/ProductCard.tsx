import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import QuantityStepper from "./QuantityStepper";

interface ProductCardProps {
  product: Product;
  selectedQuantity?: number;
}

export default function ProductCard({ product, selectedQuantity }: ProductCardProps) {
  const isSelected = selectedQuantity !== undefined;

  return (
    <article
      className={`flex flex-col rounded-xl bg-white p-4 shadow-[0_2px_10px_rgba(38,22,14,0.03)] transition-colors ${
        isSelected
          ? "border-[1.5px] border-[#c85a28]"
          : "border border-[#ede3da] hover:border-[#dcc9b8]"
      }`}
    >
      <Link
        to={`/producto/${product.id}`}
        aria-label={`Ver detalle de ${product.name}`}
        className="mb-4 block overflow-hidden rounded-lg"
      >
        <img
          src={product.image}
          alt={product.name}
          className="aspect-[4/3] w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </Link>

      <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#8c6d5c]">
        {product.category}
      </p>
      <h3 className="mt-1 text-base font-bold text-[#26160e]">
        <Link to={`/producto/${product.id}`} className="transition-colors hover:text-[#b84214]">
          {product.name}
        </Link>
      </h3>

      <div className="mt-auto flex items-center justify-between gap-3 pt-4">
        <p className="text-base font-bold text-[#26160e]">${product.price.toFixed(2)}</p>

        {isSelected ? (
          <QuantityStepper quantity={selectedQuantity} />
        ) : (
          <button
            type="button"
            className="flex cursor-pointer items-center justify-center gap-1.5 rounded-full border border-[#e3d6ca] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#26160e] transition-colors hover:border-[#b84214] hover:text-[#b84214]"
          >
            <img src="/images/icon-add-to-cart.svg" alt="" className="h-3.5 w-3.5" />
            Añadir al Carrito
          </button>
        )}
      </div>
    </article>
  );
}