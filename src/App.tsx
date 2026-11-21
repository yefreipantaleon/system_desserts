import { useState } from "react";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import CartDrawer from "./components/CartDrawer";
import ConfirmOrderModal from "./components/ConfirmOrderModal";
import { products } from "./data/products";

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    setIsCartOpen(false);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#faf5f0] text-[#26160e]">
      <div className="mx-auto max-w-6xl px-6 py-8 lg:py-12">
        <Header onOpenCart={() => setIsCartOpen(true)} />

        <div className="mt-8 pt-2">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-[#26160e]">
            Postres
          </h1>
          <p className="mt-1 text-sm text-[#7a685f]">
            Preparados frescos cada mañana con mantequilla cultivada, cacao de origen único y frutas de temporada.
          </p>

          <main className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                selectedQuantity={index === 0 ? 1 : undefined}
              />
            ))}
          </main>
        </div>
      </div>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onConfirm={handleConfirm}
      />
      <ConfirmOrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}