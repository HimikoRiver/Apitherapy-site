import HoneycombGrid from "@/components/HoneycombGrid";

export default function ReviewsSection() {
  return (
    <section
      id="reviews"
      className="relative min-h-screen overflow-hidden border-t border-white/5 bg-[#08080b] px-6 py-24"
    >
      <div className="absolute inset-0 pointer-events-none">
        <HoneycombGrid />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-amber-200/70">
          Отзывы
        </p>
        <h2 className="text-4xl font-semibold text-white">Следующий блок</h2>
      </div>
    </section>
  );
}