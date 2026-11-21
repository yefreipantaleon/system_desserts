interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function CartDrawer({ isOpen, onClose, onConfirm }: CartDrawerProps) {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        aria-hidden={!isOpen}
        className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-white p-6 shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-brand-red">Your Cart (0)</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar carrito"
            className="cursor-pointer text-2xl text-rose-500 transition-colors hover:text-brand-red"
          >
            ✕
          </button>
        </div>

        {/* Estado vacío */}
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
          <img src="/images/illustration-empty-cart.svg" alt="" className="w-32" />
          <p className="font-semibold text-rose-500">Your added items will appear here</p>
        </div>

        {/* Botón solo para visualizar el modal en el Nivel 1 */}
        <button
          type="button"
          onClick={onConfirm}
          className="w-full cursor-pointer rounded-full bg-brand-red py-4 font-semibold text-white transition-colors hover:bg-[hsl(14,86%,32%)]"
        >
          Confirm Order
        </button>
      </aside>
    </>
  );
}