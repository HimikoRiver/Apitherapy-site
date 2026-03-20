"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import HoneycombGrid from "@/components/HoneycombGrid";
import ReviewsSlider from "@/components/ReviewsSlider";
import { reviewCategories, reviewsData } from "@/data/reviewsData";

export default function ReviewsSection() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [selectedReview, setSelectedReview] = useState(null);

  const filteredReviews = useMemo(() => {
    if (activeCategory === "Все") return reviewsData;
    return reviewsData.filter((review) => review.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedReview(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      id="reviews"
      className="relative min-h-screen overflow-hidden border-t border-white/5 bg-[#08080b] px-4 py-16 md:px-6 md:py-20"
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.72]">
        <HoneycombGrid />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden overflow-visible md:block md:h-[360px] lg:h-[420px]">
        <motion.div
          initial={{ opacity: 0, x: 420, y: -40 }}
          whileInView={{ opacity: 0.9, x: 40, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-[-240px] top-[-38px] lg:right-[-260px] lg:top-[-56px]"
        >
          <Image
            src="/img/honey2.png"
            alt="Медовый декор"
            width={660}
            height={820}
            priority
            className="h-auto w-[250px] select-none object-contain lg:w-[320px] xl:w-[360px]"
          />
        </motion.div>
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_50%_38%,rgba(255,181,72,0.08),transparent_30%),radial-gradient(circle_at_50%_70%,rgba(255,181,72,0.05),transparent_40%)]" />

      <div className="relative z-20 mx-auto max-w-7xl">
        <div className="mb-8 max-w-4xl md:mb-9">
          <p className="mb-3 text-xs uppercase tracking-[0.32em] text-amber-200/85 md:text-sm">
            Отзывы
          </p>

          <h2 className="max-w-4xl text-3xl font-semibold leading-[1.02] text-white md:text-5xl xl:text-6xl">
            Истории пациентов и результаты лечения
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-white/82 md:text-[15px] md:leading-7">
            Здесь собраны реальные отзывы пациентов после прохождения курса
            апитерапии. Мы разделили их по темам, чтобы было легче найти
            похожую ситуацию.
          </p>
        </div>

        <div className="mb-7 flex flex-wrap gap-2.5 md:mb-8">
          {reviewCategories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
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

        <ReviewsSlider
          reviews={filteredReviews}
          activeCategory={activeCategory}
          onSelectReview={setSelectedReview}
        />
      </div>

      <AnimatePresence>
        {selectedReview && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/58 px-4 py-8 backdrop-blur-[5px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedReview(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.965 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.975 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative max-h-[88vh] w-full max-w-3xl overflow-hidden rounded-[28px] border border-amber-300/18 bg-[#130d08]/96 shadow-[0_30px_90px_rgba(0,0,0,0.42)]"
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-[-30px] top-[-15px] h-32 w-32 rounded-full bg-amber-300/10 blur-3xl" />
                <div className="absolute bottom-[-20px] right-[-10px] h-28 w-28 rounded-full bg-orange-300/8 blur-3xl" />
              </div>

              <div className="relative z-10 max-h-[88vh] overflow-y-auto px-5 py-5 md:px-7 md:py-7">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-flex rounded-full border border-amber-300/22 bg-[#2c1c0a]/92 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-amber-100">
                      {selectedReview.category}
                    </span>

                    <h3 className="mt-4 text-xl font-semibold text-white md:text-2xl">
                      {selectedReview.author}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedReview(null)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/14 bg-[#1a120e]/92 text-white/82 transition-all duration-300 hover:border-amber-300/28 hover:text-white"
                    aria-label="Закрыть отзыв"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-amber-300/30 via-white/12 to-transparent" />

                <p className="mt-5 whitespace-pre-line text-[14px] leading-7 text-white/92 md:text-[15px] md:leading-8">
                  {selectedReview.text}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}