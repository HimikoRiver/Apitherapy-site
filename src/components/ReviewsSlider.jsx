"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const AUTO_SLIDE_MS = 5000;
const PREVIEW_MAX_MOBILE = 150;
const PREVIEW_MAX_DESKTOP = 185;
const SWIPE_THRESHOLD = 50;

function chunkArray(arr, size) {
  const chunks = [];

  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }

  return chunks;
}

function makePreview(text, max) {
  if (text.length <= max) return text;

  const sliced = text.slice(0, max);
  const lastSpace = sliced.lastIndexOf(" ");

  if (lastSpace === -1) return `${sliced}...`;

  return `${sliced.slice(0, lastSpace)}...`;
}

function getSlideSize(width) {
  if (width < 768) return 1;
  if (width < 1280) return 4;
  return 6;
}

export default function ReviewsSlider({
  reviews,
  activeCategory,
  onSelectReview,
}) {
  const [activePage, setActivePage] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(1440);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  useEffect(() => {
    const updateWidth = () => setViewportWidth(window.innerWidth);

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const slideSize = useMemo(
    () => getSlideSize(viewportWidth),
    [viewportWidth]
  );

  const previewMax =
    viewportWidth < 768 ? PREVIEW_MAX_MOBILE : PREVIEW_MAX_DESKTOP;

  const pages = useMemo(() => {
    return chunkArray(reviews, slideSize);
  }, [reviews, slideSize]);

  const totalPages = pages.length || 1;
  const isMobile = viewportWidth < 768;

  useEffect(() => {
    setActivePage(0);
  }, [activeCategory, slideSize]);

  useEffect(() => {
    if (totalPages <= 1) return;

    const interval = setInterval(() => {
      setActivePage((prev) => (prev + 1) % totalPages);
    }, AUTO_SLIDE_MS);

    return () => clearInterval(interval);
  }, [totalPages]);

  const goPrev = () => {
    setActivePage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goNext = () => {
    setActivePage((prev) => (prev + 1) % totalPages);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const delta = touchStartX.current - touchEndX.current;

    if (Math.abs(delta) >= SWIPE_THRESHOLD) {
      if (delta > 0) goNext();
      else goPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="relative">
      <div
        className="overflow-hidden"
        onTouchStart={isMobile ? handleTouchStart : undefined}
        onTouchMove={isMobile ? handleTouchMove : undefined}
        onTouchEnd={isMobile ? handleTouchEnd : undefined}
      >
        <motion.div
          animate={{ x: `-${activePage * 100}%` }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex will-change-transform"
        >
          {pages.map((page, pageIndex) => (
            <div
              key={pageIndex}
              className="grid min-w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
            >
              {page.map((review) => {
                const previewText = makePreview(review.text, previewMax);
                const isLong = review.text.length > previewMax;

                return (
                  <article
                    key={review.id}
                    className="group relative h-[270px] overflow-hidden rounded-[22px] border border-amber-300/20 bg-[#140e0a]/90 p-4 backdrop-blur-md transition-all duration-500 hover:-translate-y-[3px] hover:border-amber-300/40 md:h-[285px]"
                  >
                    <div className="flex h-full flex-col">
                      <div className="mb-3 flex items-start justify-between">
                        <div>
                          <span className="inline-flex rounded-full border border-amber-300/25 bg-[#2c1c0a]/95 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-amber-100">
                            {review.category}
                          </span>

                          <h3 className="mt-3 text-[14px] font-semibold text-white md:text-[15px]">
                            {review.author}
                          </h3>
                        </div>

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-300/20 bg-[#2a1b0a]/90 text-xs text-amber-200">
                          ✦
                        </div>
                      </div>

                      <p className="text-[12.5px] leading-6 text-white/90 md:text-[13px]">
                        {previewText}
                      </p>

                      <div className="mt-auto flex items-end justify-between pt-3">
                        <div className="h-px flex-1 bg-gradient-to-r from-amber-300/25 via-white/10 to-transparent" />

                        <button
                          onClick={() => onSelectReview(review)}
                          className="ml-3 inline-flex items-center gap-1 rounded-full border border-amber-300/25 bg-[#2c1c0a]/95 px-3 py-1.5 text-[12px] text-amber-100 transition hover:border-amber-300/45 hover:bg-[#38230d]"
                        >
                          Читать дальше
                          {isLong ? "..." : ""}
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ))}
        </motion.div>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2 md:mt-8">
          {pages.map((_, index) => {
            const active = index === activePage;

            return (
              <button
                key={index}
                type="button"
                onClick={() => setActivePage(index)}
                aria-label={`Перейти к слайду ${index + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  isMobile
                    ? active
                      ? "h-2.5 w-2.5 scale-125 border border-amber-200/80 bg-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.34)]"
                      : "h-2.5 w-2.5 bg-white/35"
                    : active
                    ? "h-2 w-8 bg-amber-300 shadow-[0_0_18px_rgba(251,191,36,0.36)]"
                    : "h-2 w-2 bg-white/40"
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}