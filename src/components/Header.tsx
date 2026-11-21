interface HeaderProps {
  onOpenCart: () => void;
}

export default function Header({ onOpenCart }: HeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-4xl font-bold text-rose-900">Desserts</h1>

      <button
        type="button"
        onClick={onOpenCart}
        aria-label="Abrir carrito"
        className="relative flex cursor-pointer items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-rose-900 shadow-sm transition-colors hover:text-brand-red"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20">
          <g fill="currentColor" clipPath="url(#a)">
            <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .625.502h9.166v-1.25H7.036l-.5-2.5h8.298a.625.625 0 0 0 .613-.502l1.25-6.25H3.946l-.5-1.746Z" />
          </g>
          <defs>
            <clipPath id="a">
              <path fill="#fff" d="M.333 0h20v20h-20z" />
            </clipPath>
          </defs>
        </svg>
        <span>Cart</span>
        <span className="rounded-full bg-brand-red px-2 text-sm text-white">0</span>
      </button>
    </header>
  );
}