interface ConfirmOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConfirmOrderModal({ isOpen, onClose }: ConfirmOrderModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-order-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-[#faf5f0] p-6 text-[#26160e] shadow-xl">
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
        <p className="mt-1 text-sm text-[#7a685f]">
          Esperamos que disfruten de sus postres
        </p>

        <div className="mt-5 rounded-xl bg-white p-4 shadow-[0_2px_10px_rgba(38,22,14,0.03)]">
          <div className="flex items-center justify-between border-b border-[#ede3da] pb-3">
            <div className="flex items-center gap-3">
              <img
                src="/images/waffle.jpg"
                alt="Waffle with Berries"
                className="size-12 rounded-lg object-cover"
              />
              <div>
                <p className="text-sm font-bold text-[#26160e]">Waffle with Berries</p>
                <p className="text-xs text-[#7a685f]">
                  <span className="mr-2 font-semibold text-[#b84214]">1x</span>@ $6.50
                </p>
              </div>
            </div>
            <p className="text-sm font-bold text-[#26160e]">$6.50</p>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-[#7a685f]">Order Total</span>
            <span className="text-lg font-bold text-[#26160e]">$6.50</span>
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