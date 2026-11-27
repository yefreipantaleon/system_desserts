interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const buttonClass =
  "cursor-pointer rounded-full border border-[#e3d6ca] bg-white px-4 py-1.5 text-sm font-medium text-[#26160e] transition-colors hover:border-[#b84214] hover:text-[#b84214] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#e3d6ca] disabled:hover:text-[#26160e]";

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <nav aria-label="Paginación" className="mt-8 flex items-center justify-center gap-4">
      <button type="button" className={buttonClass} disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        ← Anterior
      </button>

      <span className="text-sm text-[#7a685f]">
        Página <strong className="text-[#26160e]">{page}</strong> de{" "}
        <strong className="text-[#26160e]">{totalPages}</strong>
      </span>

      <button
        type="button"
        className={buttonClass}
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Siguiente →
      </button>
    </nav>
  );
}