import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import ProductCreatePage from "../pages/ProductCreatePage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ProductEditPage from "../pages/ProductEditPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/producto/nuevo" element={<ProductCreatePage />} />
      <Route path="/producto/:id" element={<ProductDetailPage />} />
      <Route path="/producto/:id/editar" element={<ProductEditPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}