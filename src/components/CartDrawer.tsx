import { selectTotalItems, selectTotalPrice, useCartStore } from "../stores/cartStore";
import CartIcon from "./CartIcon";
import QuantityStepper from "./QuantityStepper";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function CartDrawer({ isOpen, onClose, onConfirm }: CartDrawerProps) {
  const items = useCartStore((state) => state.items);
  const totalItems = useCartStore(selectTotalItems);
  const totalPrice = useCartStore(selectTotalPrice);
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const isEmpty = items.length === 0;

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        aria-hidden={!isOpen}
        className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-white p-6 shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-brand-red">Tu Carrito ({totalItems})</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar carrito"
            className="cursor-pointer text-2xl text-rose-500 transition-colors hover:text-brand-red"
          >
            ✕
          </button>
        </div>

        {isEmpty ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <CartIcon className="h-16 w-16 text-[#dcc9b8]" />
            <p className="font-semibold text-rose-500">Los elementos que has añadido aparecerán aquí</p>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-[#ede3da] overflow-y-auto">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-3 py-4">
                  <img src={item.image} alt={item.name} className="size-14 rounded-lg object-cover" />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-[#26160e]">{item.name}</p>
                    <p className="text-xs text-[#7a685f]">
                      ${item.price.toFixed(2)} c/u ·{" "}
                      <span className="font-semibold text-[#26160e]">${(item.price * item.quantity).toFixed(2)}</span>
                    </p>
                  </div>

                  <QuantityStepper
                    quantity={item.quantity}
                    onIncrease={() => increaseQuantity(item.id)}
                    onDecrease={() => decreaseQuantity(item.id)}
                  />

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Quitar ${item.name} del carrito`}
                    className="cursor-pointer rounded-full px-2 py-1 text-sm text-[#7a685f] transition-colors hover:bg-[#ede3da] hover:text-[#b84214]"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-center justify-between border-t border-[#ede3da] pt-4">
              <span className="text-sm text-[#7a685f]">Total del pedido</span>
              <span className="text-2xl font-bold text-[#26160e]">${totalPrice.toFixed(2)}</span>
            </div>

            <button
              type="button"
              onClick={onConfirm}
              className="mt-4 w-full cursor-pointer rounded-full bg-brand-red py-4 font-semibold text-white transition-colors hover:bg-[hsl(14,86%,32%)]"
            >
              Confirmar Orden
            </button>
          </>
        )}
      </aside>
    </>
  );
}