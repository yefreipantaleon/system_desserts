import { Link } from "react-router-dom";
import { selectTotalItems, useCartStore } from "../stores/cartStore";
import CartIcon from "./CartIcon";

interface HeaderProps {
  onOpenCart: () => void;
}

export default function Header({ onOpenCart }: HeaderProps) {
  const totalItems = useCartStore(selectTotalItems);

  return (
    <header className="flex items-center justify-between border-b border-[#ede3da] pb-4">
      <Link to="/" className="flex items-center gap-2.5 text-[#26160e]">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[#f5ebe2] text-[#9a4419]">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </span>
        <span className="font-serif text-base font-semibold tracking-tight">
          Taller de repostería
        </span>
      </Link>

      <button
        type="button"
        onClick={onOpenCart}
        aria-label="Abrir carrito"
        className="flex cursor-pointer items-center gap-2 rounded-full border border-[#e3d6ca] bg-white px-4 py-1.5 text-sm font-medium text-[#26160e] shadow-[0_1px_3px_rgba(38,22,14,0.04)] transition-colors hover:border-[#b84214] hover:text-[#b84214]"
      >
        <CartIcon />
        <span>Carrito</span>
        <span className="rounded-full bg-[#b84214] px-1.5 py-0.5 text-[11px] font-semibold leading-none text-white">
          {totalItems}
        </span>
      </button>
    </header>
  );
}