import { useCategories } from "../hooks/useProductsQueries";

const BADGE_STYLES = [
  "bg-orange-100 text-orange-800",
  "bg-rose-100 text-rose-800",
  "bg-amber-100 text-amber-800",
  "bg-emerald-100 text-emerald-800",
  "bg-sky-100 text-sky-800",
  "bg-violet-100 text-violet-800",
];

interface CategoryBadgeProps {
  categoryId: number;
}

export default function CategoryBadge({ categoryId }: CategoryBadgeProps) {
  const { data: categories, isPending } = useCategories();

  if (isPending) {
    return <span className="inline-block h-5 w-16 animate-pulse rounded-full bg-[#ede3da]" aria-hidden="true" />;
  }

  const category = categories?.find((item) => Number(item.id) === categoryId);
  const style = BADGE_STYLES[categoryId % BADGE_STYLES.length];

  return (
    <span className={`inline-block w-fit rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.06em] ${style}`}>
      {category?.name ?? "Sin categoría"}
    </span>
  );
}