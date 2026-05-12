"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

import ReviewCard from "@/components/ReviewCard";
import SliderPagination from "@/components/SliderPagination";

const AUTO_SLIDE_MS = 5000;
const PREVIEW_MAX_MOBILE = 150;
const PREVIEW_MAX_DESKTOP = 185;
const SWIPE_THRESHOLD = 50;

const SLIDER_LAYOUTS = {
  mobile: {
    slideSize: 1,
    previewMax: PREVIEW_MAX_MOBILE,
    pageGridClass: "grid-cols-1 gap-4",
    isMobile: true,
    isTouchSlider: true,
  },
  tablet: {
    slideSize: 4,
    previewMax: PREVIEW_MAX_DESKTOP,
    pageGridClass: "grid-cols-2 gap-4",
    isMobile: false,
    isTouchSlider: true,
  },
  desktop: {
    slideSize: 6,
    previewMax: PREVIEW_MAX_DESKTOP,
    pageGridClass: "grid-cols-3 gap-4",
    isMobile: false,
    isTouchSlider: false,
  },
};

function clampPage(page, totalPages) {
  return Math.max(0, Math.min(page, totalPages - 1));
}

function chunkArray(arr, size) {
  const chunks = [];

  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }

  return chunks;
}

function getSliderMode() {
  if (typeof window === "undefined") return "mobile";

  if (window.matchMedia("(min-width: 1280px)").matches) {
    return "desktop";
  }

  if (window.matchMedia("(min-width: 768px)").matches) {
    return "tablet";
  }

  return "mobile";
}

export default function ReviewsSlider({
  reviews,
  activeCategory,
  onSelectReview,
}) {
  const [sliderMode, setSliderMode] = useState("mobile");
  const [pageState, setPageState] = useState({ key: "", page: 0 });

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1280px)");
    const tabletQuery = window.matchMedia("(min-width: 768px)");

    const updateSliderMode = () => {
      setSliderMode(getSliderMode());
    };

    updateSliderMode();

    desktopQuery.addEventListener("change", updateSliderMode);
    tabletQuery.addEventListener("change", updateSliderMode);

    return () => {
      desktopQuery.removeEventListener("change", updateSliderMode);
      tabletQuery.removeEventListener("change", updateSliderMode);
    };
  }, []);

  const { slideSize, previewMax, pageGridClass, isMobile, isTouchSlider } =
    SLIDER_LAYOUTS[sliderMode];

  const pages = useMemo(() => {
    return chunkArray(reviews, slideSize);
  }, [reviews, slideSize]);

  const totalPages = pages.length || 1;
  const pageResetKey = `${activeCategory}-${sliderMode}`;

  const activePage =
    pageState.key === pageResetKey
      ? clampPage(pageState.page, totalPages)
      : 0;

  const setActivePage = useCallback(
    (nextPage) => {
      setPageState((previousState) => {
        const currentPage =
          previousState.key === pageResetKey
            ? clampPage(previousState.page, totalPages)
            : 0;

        const resolvedPage =
          typeof nextPage === "function" ? nextPage(currentPage) : nextPage;

        return {
          key: pageResetKey,
          page: clampPage(resolvedPage, totalPages),
        };
      });
    },
    [pageResetKey, totalPages]
  );

  useEffect(() => {
    if (totalPages <= 1) return;

    const interval = setInterval(() => {
      setActivePage((prev) => (prev + 1) % totalPages);
    }, AUTO_SLIDE_MS);

    return () => clearInterval(interval);
  }, [setActivePage, totalPages]);

  const goPrev = useCallback(() => {
    setActivePage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [setActivePage, totalPages]);

  const goNext = useCallback(() => {
    setActivePage((prev) => (prev + 1) % totalPages);
  }, [setActivePage, totalPages]);

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
        className="overflow-hidden touch-pan-y"
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
              className={`grid min-w-full auto-rows-fr ${pageGridClass}`}
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
        isMobile={isMobile}
        onChange={setActivePage}
      />
    </div>
  );
}