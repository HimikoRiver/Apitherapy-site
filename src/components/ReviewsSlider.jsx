"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

import ReviewCard from "@/components/ReviewCard";
import SliderPagination from "@/components/SliderPagination";

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
  const isTouchSlider = viewportWidth < 1280;

  useEffect(() => {
    setActivePage(0);
  }, [activeCategory, slideSize]);

  useEffect(() => {
    if (activePage > totalPages - 1) {
      setActivePage(Math.max(totalPages - 1, 0));
    }
  }, [activePage, totalPages]);

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
    if (touchStartX.current == null || touchEndX.current == null) return;

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
        onTouchStart={isTouchSlider ? handleTouchStart : undefined}
        onTouchMove={isTouchSlider ? handleTouchMove : undefined}
        onTouchEnd={isTouchSlider ? handleTouchEnd : undefined}
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
              {page.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  previewMax={previewMax}
                  onSelectReview={onSelectReview}
                />
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      <SliderPagination
        totalPages={totalPages}
        activePage={activePage}
        isMobile={viewportWidth < 768}
        onChange={setActivePage}
      />
    </div>
  );
}