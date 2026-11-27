import type { Order } from "../interfaces/cart";

interface ConfirmOrderModalProps {
  order: Order | null;
  onClose: () => void;
}

export default function ConfirmOrderModal({ order, onClose }: ConfirmOrderModalProps) {
  if (!order) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-order-title"
    >
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-[#faf5f0] p-6 text-[#26160e] shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#ede3da] text-lg font-bold text-[#b84214]">
            ✓
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="cursor-pointer rounded-full px-2.5 py-1 text-sm font-semibold text-[#7a685f] transition-colors hover:bg-[#ede3da] hover:text-[#26160e]"
          >
            ✕
          </button>
        </div>

        <h2 id="confirm-order-title" className="font-serif text-2xl font-bold text-[#26160e]">
          Orden Confirmada
        </h2>
        <p className="mt-1 text-sm text-[#7a685f]">Esperamos que disfruten de sus postres</p>

        <div className="mt-5 rounded-xl bg-white p-4 shadow-[0_2px_10px_rgba(38,22,14,0.03)]">
          <ul className="divide-y divide-[#ede3da]">
            {order.items.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-3 py-3 first:pt-0">
                <div className="flex min-w-0 items-center gap-3">
                  <img src={item.image} alt={item.name} className="size-12 shrink-0 rounded-lg object-cover" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#26160e]">{item.name}</p>
                    <p className="text-xs text-[#7a685f]">
                      <span className="mr-2 font-semibold text-[#b84214]">{item.quantity}x</span>@ $
                      {item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-bold text-[#26160e]">${(item.price * item.quantity).toFixed(2)}</p>
              </li>
            ))}
          </ul>

          <div className="mt-3 flex items-center justify-between border-t border-[#ede3da] pt-3">
            <span className="text-sm text-[#7a685f]">Total del pedido</span>
            <span className="text-lg font-bold text-[#26160e]">${order.total.toFixed(2)}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full cursor-pointer rounded-full bg-[#b84214] py-3 text-sm font-semibold text-white transition-colors hover:opacity-95"
        >
          Nuevo Pedido
        </button>
      </div>
    </div>
  );
}