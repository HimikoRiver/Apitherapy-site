"use client";

import { ChevronRight, Star } from "lucide-react";

function makePreview(text, max) {
  if (text.length <= max) return text;

  const sliced = text.slice(0, max);
  const lastSpace = sliced.lastIndexOf(" ");

  if (lastSpace === -1) return `${sliced}...`;

  return `${sliced.slice(0, lastSpace)}...`;
}

function getSafeRating(rating) {
  const value = Number(rating);

  if (!Number.isInteger(value)) return 5;

  return Math.max(1, Math.min(value, 5));
}

export default function ReviewCard({ review, previewMax, onSelectReview }) {
  const previewText = makePreview(review.text, previewMax);
  const isLong = review.text.length > previewMax;
  const rating = getSafeRating(review.rating);

  return (
    <article className="group relative flex h-full min-h-[250px] flex-col overflow-hidden rounded-[22px] border border-amber-300/20 bg-[#140e0a]/90 p-4 backdrop-blur-md transition-all duration-500 hover:-translate-y-[3px] hover:border-amber-300/40 md:min-h-[270px] md:p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="inline-flex rounded-full border border-amber-300/25 bg-[#2c1c0a]/95 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-amber-100">
            {review.category}
          </span>

          <h3 className="mt-3 break-words text-[14px] font-semibold text-white md:text-[15px]">
            {review.author}
          </h3>

          <div
            className="mt-2 flex items-center gap-1 text-amber-200"
            aria-label={`Оценка ${rating} из 5`}
          >
            {[1, 2, 3, 4, 5].map((star) => {
              const active = star <= rating;

              return (
                <Star
                  key={star}
                  size={14}
                  fill={active ? "currentColor" : "none"}
                  className={active ? "text-amber-200" : "text-white/24"}
                />
              );
            })}
          </div>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-amber-300/20 bg-[#2a1b0a]/90 text-xs font-semibold text-amber-200">
          {rating}.0
        </div>
      </div>

      <p className="text-[12.5px] leading-6 text-white/90 md:text-[13px] md:leading-6">
        {previewText}
      </p>

      <div className="mt-auto flex items-end justify-between pt-4">
        <div className="h-px flex-1 bg-gradient-to-r from-amber-300/25 via-white/10 to-transparent" />

        <button
          type="button"
          onClick={() => onSelectReview(review)}
          className="ml-3 inline-flex shrink-0 items-center gap-1 rounded-full border border-amber-300/25 bg-[#2c1c0a]/95 px-3 py-1.5 text-[12px] text-amber-100 transition-all duration-300 hover:border-amber-300/45 hover:bg-[#38230d]"
          aria-label={`Открыть полный отзыв: ${review.author}`}
        >
          Читать дальше
          {isLong ? "..." : ""}
          <ChevronRight size={14} />
        </button>
      </div>
    </article>
  );
}