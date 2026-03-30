"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import HoneycombGrid from "@/components/HoneycombGrid";
import ReviewsFiltersBlock from "@/components/ReviewsFiltersBlock";
import ReviewModal from "@/components/ReviewModal";
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
    if (!selectedReview) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedReview(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedReview]);

  return (
    <section
      id="reviews"
      className="relative overflow-hidden border-t border-white/5 bg-[#08080b] px-4 pt-16 pb-6 md:px-6 md:pt-20 md:pb-12 xl:pb-16"
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.72]">
        <HoneycombGrid />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden overflow-visible md:block md:h-[330px] lg:h-[390px] xl:h-[430px]">
        <motion.div
          initial={{ opacity: 0, x: 260, y: -18 }}
          whileInView={{ opacity: 0.94, x: 0, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-[-12px] top-[-6px] lg:right-[-20px] lg:top-[-14px] xl:right-[-26px] xl:top-[-18px]"
        >
          <Image
            src="/img/honey3.webp"
            alt="Медовый декор"
            width={760}
            height={760}
            sizes="(min-width: 1280px) 430px, (min-width: 1024px) 370px, 290px"
            className="h-auto w-[290px] select-none object-contain lg:w-[370px] xl:w-[430px]"
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

        <ReviewsFiltersBlock
          categories={reviewCategories}
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />

        <ReviewsSlider
          reviews={filteredReviews}
          activeCategory={activeCategory}
          onSelectReview={setSelectedReview}
        />
      </div>

      <ReviewModal
        selectedReview={selectedReview}
        onClose={() => setSelectedReview(null)}
      />
    </section>
  );
}