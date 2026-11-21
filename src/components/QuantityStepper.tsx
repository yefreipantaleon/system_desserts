interface QuantityStepperProps {
  quantity: number;
}

// Componente puramente visual (Nivel 1): los botones no tienen lógica todavía.
export default function QuantityStepper({ quantity }: QuantityStepperProps) {
  return (
    <div className="flex w-28 items-center justify-between rounded-full bg-[#b84214] px-2.5 py-1.5">
      <button
        type="button"
        aria-label="Disminuir cantidad"
        className="flex size-5 cursor-pointer items-center justify-center rounded-full border border-white/80 transition-colors hover:bg-white [&:hover_path]:fill-[#b84214]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="2" fill="none" viewBox="0 0 10 2">
          <path fill="#fff" d="M0 .375h10v1.25H0V.375Z" />
        </svg>
      </button>

      <span className="text-xs font-semibold text-white">{quantity}</span>

      <button
        type="button"
        aria-label="Aumentar cantidad"
        className="flex size-5 cursor-pointer items-center justify-center rounded-full border border-white/80 transition-colors hover:bg-white [&:hover_path]:fill-[#b84214]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" fill="none" viewBox="0 0 10 10">
          <path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z" />
        </svg>
      </button>
    </div>
  );
}