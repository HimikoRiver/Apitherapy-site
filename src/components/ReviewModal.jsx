"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function ReviewModal({ selectedReview, onClose }) {
  return (
    <AnimatePresence>
      {selectedReview && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/58 px-4 py-8 backdrop-blur-[5px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
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
                  onClick={onClose}
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
  );
}