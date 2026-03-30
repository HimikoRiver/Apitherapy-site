"use client";

function getMobileVisibleIndexes(totalPages, activePage) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index);
  }

  if (activePage <= 1) {
    return [0, 1, 2, 3, totalPages - 1];
  }

  if (activePage >= totalPages - 2) {
    return [0, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1];
  }

  return [0, activePage - 1, activePage, activePage + 1, totalPages - 1];
}

export default function SliderPagination({
  totalPages,
  activePage,
  isMobile,
  onChange,
}) {
  if (totalPages <= 1) return null;

  if (isMobile) {
    const visibleIndexes = getMobileVisibleIndexes(totalPages, activePage);

    return (
      <div className="mt-3 flex items-center justify-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/18 bg-[#140d09]/78 px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.2)] backdrop-blur-[6px]">
          {visibleIndexes.map((index, itemIndex) => {
            const active = index === activePage;
            const prevIndex = visibleIndexes[itemIndex - 1];
            const showGap = itemIndex > 0 && index - prevIndex > 1;

            return (
              <div key={index} className="flex items-center gap-1.5">
                {showGap && (
                  <span className="mx-[1px] text-[10px] leading-none text-white/28">
                    •
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => onChange(index)}
                  aria-label={`Перейти к слайду ${index + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    active
                      ? "h-2.5 w-6 bg-amber-300 shadow-[0_0_14px_rgba(251,191,36,0.38)]"
                      : "h-2.5 w-2.5 bg-white/35 hover:bg-white/55"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 flex items-center justify-center gap-2 md:mt-8">
      {Array.from({ length: totalPages }).map((_, index) => {
        const active = index === activePage;

        return (
          <button
            key={index}
            type="button"
            onClick={() => onChange(index)}
            aria-label={`Перейти к слайду ${index + 1}`}
            className={`rounded-full transition-all duration-300 ${
              active
                ? "h-2 w-8 bg-amber-300 shadow-[0_0_18px_rgba(251,191,36,0.36)]"
                : "h-2 w-2 bg-white/40 hover:bg-white/60"
            }`}
          />
        );
      })}
    </div>
  );
}