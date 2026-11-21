import { products } from "../data/products";

interface ConfirmOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Contenido estático de ejemplo (sin lógica de carrito en el Nivel 1)
const sampleItems = products.slice(0, 3);

export default function ConfirmOrderModal({ isOpen, onClose }: ConfirmOrderModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-title"
        className="w-full max-w-lg rounded-t-2xl bg-white p-6 sm:rounded-2xl sm:p-10"
      >
        <img src="/images/icon-order-confirmed.svg" alt="" className="mb-6" />
        <h2 id="order-title" className="text-4xl font-bold leading-tight text-rose-900">
          Order Confirmed
        </h2>
        <p className="mt-2 mb-8 text-rose-500">We hope you enjoy your food!</p>

        <div className="mb-8 rounded-lg bg-rose-50 p-4">
          <ul className="divide-y divide-rose-100">
            {sampleItems.map((item) => (
              <li key={item.id} className="flex items-center gap-4 py-4">
                <img src={item.image.mobile} alt={item.name} className="size-12 rounded object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-sm">
                    <span className="font-semibold text-brand-red">1x</span>{" "}
                    <span className="text-rose-500">@ ${item.price.toFixed(2)}</span>
                  </p>
                </div>
                <p className="font-semibold">${item.price.toFixed(2)}</p>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center justify-between border-t border-rose-100 pt-4">
            <span className="text-sm">Order Total</span>
            <span className="text-2xl font-bold">
              ${sampleItems.reduce((acc, i) => acc + i.price, 0).toFixed(2)}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full cursor-pointer rounded-full bg-brand-red py-4 font-semibold text-white transition-colors hover:bg-[hsl(14,86%,32%)]"
        >
          Start New Order
        </button>
      </div>
    </div>
  );
}