import HeroSection from "@/components/HeroSection";
import HoneycombGrid from "@/components/HoneycombGrid";

export default function Home() {
  return (
    <main className="bg-[#050507] text-white">
      <HeroSection />

      <section
        id="about"
        className="relative z-10 min-h-screen border-t border-white/5 bg-[#08080b] px-6 py-24"
      >
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-amber-200/70">
            О специалисте
          </p>
          <h2 className="text-4xl font-semibold">Следующий блок</h2>
        </div>
      </section>

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

      <section
        id="reviews"
        className="min-h-screen border-t border-white/5 bg-[#08080b] px-6 py-24"
      >
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-amber-200/70">
            Отзывы
          </p>
          <h2 className="text-4xl font-semibold">Следующий блок</h2>
        </div>
      </section>

      <section
        id="contacts"
        className="min-h-screen border-t border-white/5 bg-[#0b0b0f] px-6 py-24"
      >
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-amber-200/70">
            Контакты
          </p>
          <h2 className="text-4xl font-semibold">Следующий блок</h2>
        </div>
      </section>
    </main>
  );
}