import type { ReactNode } from "react";

interface StateMessageProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ReactNode;
}

export default function StateMessage({ title, description, actionLabel, onAction, icon }: StateMessageProps) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center rounded-xl border border-dashed border-[#e3d6ca] bg-white px-6 py-16 text-center">
      {icon && <div className="mb-3 text-4xl">{icon}</div>}
      <h2 className="text-lg font-bold text-[#26160e]">{title}</h2>
      {description && <p className="mt-1 max-w-md text-sm text-[#7a685f]">{description}</p>}
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 cursor-pointer rounded-full bg-[#b84214] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#9a3610]"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}