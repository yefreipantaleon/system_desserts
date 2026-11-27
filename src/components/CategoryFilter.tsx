import { useCategories } from "../hooks/useProductsQueries";

interface CategoryFilterProps {
  selected: number;
  onSelect: (categoryId: number) => void;
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
        onClick={() => onSelect(0)}
        aria-pressed={selected === 0}
        className={`${baseButton} ${selected === 0 ? activeButton : inactiveButton}`}
      >
        Todos
      </button>
      {categories?.map((category) => {
        const id = Number(category.id);
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelect(id)}
            aria-pressed={selected === id}
            className={`${baseButton} ${selected === id ? activeButton : inactiveButton}`}
          >
            {category.name}
          </button>
        );
      })}
    </div>
  );
}