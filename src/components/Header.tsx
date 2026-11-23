import { Link } from "react-router-dom";

interface HeaderProps {
  onOpenCart: () => void;
}

export default function Header({ onOpenCart }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-[#ede3da] pb-4">
      <Link to="/" className="flex items-center gap-2.5 text-[#26160e]">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[#f5ebe2] text-[#9a4419]">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </span>
        <span className="font-serif text-base font-semibold tracking-tight">
          Taller de repostería
        </span>
      </Link>

      <button
        type="button"
        onClick={onOpenCart}
        aria-label="Abrir carrito"
        className="flex cursor-pointer items-center gap-2 rounded-full border border-[#e3d6ca] bg-white px-4 py-1.5 text-sm font-medium text-[#26160e] shadow-[0_1px_3px_rgba(38,22,14,0.04)] transition-colors hover:border-[#b84214] hover:text-[#b84214]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 21 20">
          <g fill="currentColor" clipPath="url(#a)">
            <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .625.502h9.166v-1.25H7.036l-.5-2.5h8.298a.625.625 0 0 0 .613-.502l1.25-6.25H3.946l-.5-1.746Z" />
          </g>
          <defs>
            <clipPath id="a">
              <path fill="#fff" d="M.333 0h20v20h-20z" />
            </clipPath>
          </defs>
        </svg>
        <span>Carrito</span>
        <span className="rounded-full bg-[#b84214] px-1.5 py-0.5 text-[11px] font-semibold leading-none text-white">
          0
        </span>
      </button>
    </header>
  );
}