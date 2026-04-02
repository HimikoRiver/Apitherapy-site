"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SocialLinkCard({ item }) {
  return (
    <div className="group relative flex items-center transition-all duration-500">
      <div className="pointer-events-none absolute bottom-[calc(100%+14px)] left-1/2 z-30 hidden w-[148px] -translate-x-1/2 translate-y-4 rounded-[22px] border border-amber-200/20 bg-[#0b0b10]/95 p-3 opacity-0 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 md:block">
        <div className="absolute left-1/2 top-full h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-amber-200/20 bg-[#0b0b10]/95" />

        <div className="mb-2 text-center text-[10px] uppercase tracking-[0.22em] text-amber-200/70">
          {item.name}
        </div>

        <div className="overflow-hidden rounded-[16px] border border-white/10 bg-white p-2">
          <Image
            src={item.qr}
            alt={`${item.name} QR`}
            width={132}
            height={132}
            sizes="132px"
            className="h-auto w-full rounded-[10px]"
          />
        </div>
      </div>

      <motion.div
        whileHover={{ y: -6, scale: 1.05 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        <Link
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.name}
          className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] transition-all duration-300 hover:border-amber-200/30 hover:bg-white/[0.07] hover:shadow-[0_18px_40px_rgba(245,176,65,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/50"
        >
          <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,rgba(255,220,120,0.16),transparent_68%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100" />

          <Image
            src={item.icon}
            alt={item.name}
            width={36}
            height={36}
            sizes="36px"
            className="relative h-8 w-8 object-contain md:h-9 md:w-9"
          />
        </Link>
      </motion.div>
    </div>
  );
}