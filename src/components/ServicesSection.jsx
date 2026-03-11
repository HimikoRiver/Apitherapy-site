import HoneycombGrid from "@/components/HoneycombGrid";

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative min-h-screen overflow-hidden border-t border-white/5 bg-[#0b0b0f] px-6 py-24"
    >
      <HoneycombGrid />

      <div className="relative z-20 mx-auto max-w-6xl">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-amber-200/70">
          Услуги
        </p>
        <h2 className="text-4xl font-semibold">Следующий блок</h2>
      </div>
    </section>
  );
}