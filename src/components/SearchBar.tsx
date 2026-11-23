interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full sm:max-w-sm">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[#8c6d5c]"
      >
        <circle cx="11" cy="11" r="7" />
        <path strokeLinecap="round" d="m20 20-3.5-3.5" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar postre por nombre..."
        aria-label="Buscar postre por nombre"
        className="w-full rounded-full border border-[#e3d6ca] bg-white py-2.5 pr-4 pl-10 text-sm text-[#26160e] outline-none transition-colors placeholder:text-[#a8958a] focus:border-[#b84214]"
      />
    </div>
  );
}