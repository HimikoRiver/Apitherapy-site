"use client";

import { ChevronRight } from "lucide-react";

function makePreview(text, max) {
  if (text.length <= max) return text;

  const sliced = text.slice(0, max);
  const lastSpace = sliced.lastIndexOf(" ");

  if (lastSpace === -1) return `${sliced}...`;

  return `${sliced.slice(0, lastSpace)}...`;
}

export default function ReviewCard({ review, previewMax, onSelectReview }) {
  const previewText = makePreview(review.text, previewMax);
  const isLong = review.text.length > previewMax;

  return (
    <article className="group relative h-[270px] overflow-hidden rounded-[22px] border border-amber-300/20 bg-[#140e0a]/90 p-4 backdrop-blur-md transition-all duration-500 hover:-translate-y-[3px] hover:border-amber-300/40 md:h-[285px]">
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
            type="button"
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
}