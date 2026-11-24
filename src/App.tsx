import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import CartDrawer from "./components/CartDrawer";
import ConfirmOrderModal from "./components/ConfirmOrderModal";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductDetailPage from "./pages/ProductDetailPage";

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

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/producto/:id" element={<ProductDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
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