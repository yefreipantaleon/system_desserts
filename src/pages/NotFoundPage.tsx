import { Link } from "react-router-dom";

interface NotFoundPageProps {
  message?: string;
}

export default function NotFoundPage({ message = "La página que buscas no existe." }: NotFoundPageProps) {
  return (
    <div className="mt-16 flex flex-col items-center text-center">
      <p className="font-serif text-7xl font-bold text-[#b84214]">404</p>
      <h1 className="mt-3 text-2xl font-bold text-[#26160e]">No encontrado</h1>
      <p className="mt-2 text-sm text-[#7a685f]">{message}</p>
      <Link
        to="/"
        className="mt-6 rounded-full bg-[#b84214] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#9a3610]"
      >
        Volver al inicio
      </Link>
    </div>
  );
}