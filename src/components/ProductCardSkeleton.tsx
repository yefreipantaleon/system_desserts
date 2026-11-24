export default function ProductCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex animate-pulse flex-col rounded-xl border border-[#ede3da] bg-white p-4"
    >
      <div className="mb-4 aspect-[4/3] w-full rounded-lg bg-[#ede3da]" />
      <div className="h-3 w-20 rounded bg-[#ede3da]" />
      <div className="mt-2 h-4 w-3/4 rounded bg-[#ede3da]" />
      <div className="mt-auto flex items-center justify-between pt-4">
        <div className="h-4 w-12 rounded bg-[#ede3da]" />
        <div className="h-7 w-28 rounded-full bg-[#ede3da]" />
      </div>
    </div>
  );
}