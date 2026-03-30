"use client";

export default function ReviewsFiltersBlock({
  categories,
  activeCategory,
  onChange,
}) {
  return (
    <div className="mb-7 flex flex-wrap gap-2.5 md:mb-8">
      {categories.map((category) => {
        const isActive = activeCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={`rounded-full border px-3.5 py-2 text-xs font-medium transition-all duration-300 md:px-4 md:py-2.5 md:text-sm ${
              isActive
                ? "border-amber-300/60 bg-[#34210c]/92 text-amber-100 shadow-[0_0_0_1px_rgba(251,191,36,0.12),0_10px_30px_rgba(0,0,0,0.18)]"
                : "border-white/15 bg-[#18110d]/84 text-white/88 hover:border-amber-300/35 hover:bg-[#20160f]/92 hover:text-white"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}