import { useState } from "react";
import { Toaster } from "sonner";
import CartDrawer from "./components/CartDrawer";
import ConfirmOrderModal from "./components/ConfirmOrderModal";
import Header from "./components/Header";
import type { Order } from "./interfaces/cart";
import AppRoutes from "./rutas/AppRoutes";
import { selectTotalPrice, useCartStore } from "./stores/cartStore";

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);

  const items = useCartStore((state) => state.items);
  const total = useCartStore(selectTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  const handleConfirm = () => {
    if (items.length === 0) return;
    setOrder({ items, total });
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#faf5f0] text-[#26160e]">
      <div className="mx-auto max-w-6xl px-6 py-8 lg:py-12">
        <Header onOpenCart={() => setIsCartOpen(true)} />
        <AppRoutes />
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onConfirm={handleConfirm} />
      <ConfirmOrderModal order={order} onClose={() => setOrder(null)} />

      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}