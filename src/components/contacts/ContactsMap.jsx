"use client";

import { useState } from "react";
import { MousePointer2 } from "lucide-react";

export default function ContactsMap() {
  const [isInteractive, setIsInteractive] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0b0b10]/90 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(135deg,rgba(255,214,102,0.08),transparent_24%,transparent_75%,rgba(255,214,102,0.06))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />

      <iframe
        src="https://yandex.ru/map-widget/v1/?ll=45.692174%2C43.324869&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgoyMjA4NTAwNjQxEmPQoNC-0YHRgdC40Y8sINCn0LXRh9C10L3RgdC60LDRjyDQoNC10YHQv9GD0LHQu9C40LrQsCwg0JPRgNC-0LfQvdGL0LksINGD0LvQuNGG0LAg0JPQuNC60LDQu9C-LCA20JIiCg0hyTZCFetMLUI%2C&z=16.68"
        title="Карта филиалов"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="relative z-0 h-[320px] w-full md:h-[380px] lg:h-[440px]"
        style={{
          pointerEvents: isInteractive ? "auto" : "none",
          filter:
            "grayscale(0.2) contrast(1.05) brightness(0.85) saturate(0.85)",
        }}
      />

      {!isInteractive && (
        <button
          type="button"
          onClick={() => setIsInteractive(true)}
          className="absolute inset-0 z-10 flex items-center justify-center bg-[#050507]/30 backdrop-blur-[2px] transition duration-300 hover:bg-[#050507]/24"
          aria-label="Активировать карту"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0b0b10]/90 px-5 py-3 text-sm text-white/80 shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
            <MousePointer2 className="h-4 w-4 text-amber-200" />
            <span>Нажмите, чтобы активировать карту</span>
          </div>
        </button>
      )}
    </div>
  );
}