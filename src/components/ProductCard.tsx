import { Link } from "react-router-dom";
import { useCartStore } from "../stores/cartStore";
import type { Product } from "../interfaces/product";
import CartIcon from "./CartIcon";
import CategoryBadge from "./CategoryBadge";
import QuantityStepper from "./QuantityStepper";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const quantity = useCartStore((state) => state.items.find((item) => item.id === product.id)?.quantity ?? 0);
  const addItem = useCartStore((state) => state.addItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const isSelected = quantity > 0;

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

      <CategoryBadge categoryId={product.categoryId} />
      <h3 className="mt-2 text-base font-bold text-[#26160e]">
        <Link to={`/producto/${product.id}`} className="transition-colors hover:text-[#b84214]">
          {product.name}
        </Link>
      </h3>

      <div className="mt-auto flex items-center justify-between gap-3 pt-4">
        <p className="text-base font-bold text-[#26160e]">${product.price.toFixed(2)}</p>

        {isSelected ? (
          <QuantityStepper
            quantity={quantity}
            onIncrease={() => increaseQuantity(product.id)}
            onDecrease={() => decreaseQuantity(product.id)}
          />
        ) : (
          <button
            type="button"
            onClick={() => addItem(product)}
            className="flex cursor-pointer items-center justify-center gap-1.5 rounded-full border border-[#e3d6ca] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#26160e] transition-colors hover:border-[#b84214] hover:text-[#b84214]"
          >
            <CartIcon className="h-3.5 w-3.5" />
            Añadir al Carrito
          </button>
        )}
      </div>
    </article>
  );
}