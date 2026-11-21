import type { Product } from "../types/product";
import QuantityStepper from "./QuantityStepper";

interface ProductCardProps {
  product: Product;
  /** Solo para demostración visual del estado "seleccionado" */
  selectedQuantity?: number;
}

export default function ProductCard({ product, selectedQuantity }: ProductCardProps) {
  const isSelected = selectedQuantity !== undefined;

  return (
    <article className="flex flex-col">
      <div className="relative mb-9">
        <picture>
          <source media="(min-width: 1024px)" srcSet={product.image.desktop} />
          <source media="(min-width: 640px)" srcSet={product.image.tablet} />
          <img
            src={product.image.mobile}
            alt={product.name}
            className={`w-full rounded-lg object-cover ${
              isSelected ? "border-2 border-brand-red" : "border-2 border-transparent"
            }`}
          />
        </picture>

        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
          {isSelected ? (
            <QuantityStepper quantity={selectedQuantity} />
          ) : (
            <button
              type="button"
              className="flex w-40 cursor-pointer items-center justify-center gap-2 rounded-full border border-rose-400 bg-white px-4 py-3 text-sm font-semibold text-rose-900 transition-colors hover:border-brand-red hover:text-brand-red"
            >
              <img src="/images/icon-add-to-cart.svg" alt="" />
              Add to Cart
            </button>
          )}
        </div>
      </div>

      <p className="text-sm text-rose-500">{product.category}</p>
      <h3 className="font-semibold text-rose-900">{product.name}</h3>
      <p className="font-semibold text-brand-red">${product.price.toFixed(2)}</p>
    </article>
  );
}