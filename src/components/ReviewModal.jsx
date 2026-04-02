"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

export default function ReviewModal({ selectedReview, onClose }) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!selectedReview) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedReview, onClose]);

  return (
    <AnimatePresence>
      {selectedReview && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/62 px-4 py-4 backdrop-blur-[5px] md:px-5 md:py-6"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={shouldReduceMotion ? {} : { opacity: 1 }}
          exit={shouldReduceMotion ? {} : { opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="review-modal-title"
        >
          <motion.div
            initial={
              shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.97 }
            }
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
            exit={
              shouldReduceMotion ? {} : { opacity: 0, y: 18, scale: 0.98 }
            }
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative max-h-[88dvh] w-full max-w-3xl overflow-hidden rounded-[24px] border border-amber-300/18 bg-[#130d08]/96 shadow-[0_30px_90px_rgba(0,0,0,0.42)] md:rounded-[28px]"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-[-30px] top-[-15px] h-32 w-32 rounded-full bg-amber-300/10 blur-3xl" />
              <div className="absolute right-[-10px] bottom-[-20px] h-28 w-28 rounded-full bg-orange-300/8 blur-3xl" />
            </div>

            <div className="relative z-10 max-h-[88dvh] overflow-y-auto overscroll-contain px-4 py-4 md:px-7 md:py-7">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <span className="inline-flex rounded-full border border-amber-300/22 bg-[#2c1c0a]/92 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-amber-100">
                    {selectedReview.category}
                  </span>

                  <h3
                    id="review-modal-title"
                    className="mt-4 break-words text-xl font-semibold text-white md:text-2xl"
                  >
                    {selectedReview.author}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/14 bg-[#1a120e]/92 text-white/82 transition-all duration-300 hover:border-amber-300/28 hover:text-white"
                  aria-label="Закрыть отзыв"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-amber-300/30 via-white/12 to-transparent" />

              <p className="mt-5 whitespace-pre-line break-words text-[14px] leading-7 text-white/92 md:text-[15px] md:leading-8">
                {selectedReview.text}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}