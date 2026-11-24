import { useCategories } from "../hooks/useProducts";

interface CategoryFilterProps {
  selected: string;
  onSelect: (category: string) => void;
}

const baseButton =
  "cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition-colors";
const activeButton = "border-[#b84214] bg-[#b84214] text-white";
const inactiveButton =
  "border-[#e3d6ca] bg-white text-[#26160e] hover:border-[#b84214] hover:text-[#b84214]";

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const { data: categories, isPending } = useCategories();

  if (isPending) {
    return (
      <div className="flex animate-pulse gap-2" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-8 w-20 rounded-full bg-[#ede3da]" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
      <button
        type="button"
        onClick={() => onSelect("")}
        aria-pressed={selected === ""}
        className={`${baseButton} ${selected === "" ? activeButton : inactiveButton}`}
      >
        Todos
      </button>
      {categories?.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onSelect(category.name)}
          aria-pressed={selected === category.name}
          className={`${baseButton} ${selected === category.name ? activeButton : inactiveButton}`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}