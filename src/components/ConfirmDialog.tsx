import type { ConfirmDialogProps } from "../interfaces/ConfirmDialogProps";

export default function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = "Confirmar",
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <div className="w-full max-w-sm rounded-2xl bg-[#faf5f0] p-6 text-[#26160e] shadow-xl">
        <h2 id="confirm-dialog-title" className="font-serif text-xl font-bold">
          {title}
        </h2>
        <p id="confirm-dialog-description" className="mt-2 text-sm text-[#7a685f]">
          {description}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="cursor-pointer rounded-full border border-[#e3d6ca] bg-white px-5 py-2 text-sm font-semibold transition-colors hover:border-[#b84214] hover:text-[#b84214] disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="cursor-pointer rounded-full bg-[#b84214] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#9a3610] disabled:opacity-60"
          >
            {isLoading ? "Eliminando..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}