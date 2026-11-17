import { getCategory } from "@/data/categories";
import type { CategoryId } from "@/data/categories";

export function CategoryMark({ id }: { id: CategoryId }) {
  const category = getCategory(id);
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-lime">
      <span className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden="true" />
      {category.short}
    </span>
  );
}
