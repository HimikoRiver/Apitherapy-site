"use client";

import Image from "next/image";

export default function AboutFeatures({
  features,
  featuresRef,
  featuresVisible,
}) {
  return (
    <div ref={featuresRef} className="mt-20 border-t border-white/10 pt-12">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
        {features.map((item, index) => (
          <div
            key={item.title}
            className={`group flex flex-col items-center text-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              featuresVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-11 opacity-0"
            }`}
            style={{
              transitionDelay: featuresVisible ? `${index * 120}ms` : "0ms",
            }}
          >
            <div className="relative mb-6 flex min-h-[96px] items-center justify-center">
              <div className="absolute h-20 w-20 bg-amber-300/14 blur-3xl transition duration-300 group-hover:bg-amber-300/20" />
              <div className="absolute h-14 w-14 bg-yellow-200/8 blur-2xl" />

              <Image
                src={item.icon}
                alt={item.title}
                width={84}
                height={84}
                className="relative z-10 h-[84px] w-[84px] object-contain transition duration-300 group-hover:scale-110"
                sizes="84px"
              />
            </div>

            <p className="text-sm font-medium text-white/90">{item.title}</p>

            {item.text && (
              <p className="mt-1 text-sm leading-relaxed text-white/60">
                {item.text}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}