"use client";

import Image from "next/image";
import Link from "next/link";
import { Send, MessageCircle, Instagram } from "lucide-react";

const ICON_MAP = {
  telegram: Send,
  whatsapp: MessageCircle,
  instagram: Instagram,
};

export default function ConditionSocialLinks({
  eyebrow = "Онлайн",
  title = "Мессенджеры и соцсети",
  links = [],
}) {
  if (!links?.length) return null;

  return (
    <section className="relative w-full overflow-visible rounded-[32px] border border-white/10 bg-[#0b0b10]/85 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-sm sm:p-6">
      <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_top_left,rgba(255,220,120,0.10),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/25 to-transparent" />

      <div className="relative z-10 flex w-full flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div className="w-full md:flex-1">
          <div className="flex flex-col items-center gap-3 sm:flex-row md:items-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-200/20 bg-amber-300/10 shadow-[0_0_30px_rgba(255,191,73,0.12)]">
              <Send className="h-5 w-5 text-amber-200" />
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-amber-200/65">
                {eyebrow}
              </p>
              <p className="text-lg font-medium text-white">{title}</p>
            </div>
          </div>
        </div>

        <div className="flex w-full justify-center md:w-auto md:justify-end md:ml-auto">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {links.map((item) => {
              const Icon = ICON_MAP[item.icon] ?? Send;

              return (
                <div key={item.label} className="group relative">
                  {item.qr ? (
                    <div className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 w-[132px] -translate-x-1/2 rounded-[18px] border border-white/10 bg-[#0b0b10]/95 p-2 opacity-0 shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition duration-300 group-hover:translate-y-[-4px] group-hover:opacity-100">
                      <div className="overflow-hidden rounded-[14px]">
                        <Image
                          src={item.qr}
                          alt={`${item.label} QR`}
                          width={116}
                          height={116}
                          className="h-auto w-full object-contain"
                        />
                      </div>
                    </div>
                  ) : null}

                  <Link
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    aria-label={item.label}
                    className="group/link inline-flex h-[76px] w-[76px] items-center justify-center rounded-[22px] border border-white/10 bg-white/[0.03] text-white/75 transition duration-300 hover:-translate-y-0.5 hover:border-amber-200/22 hover:bg-white/[0.05] hover:text-[#f4d27a]"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-200/18 bg-[#17110d]/85 shadow-[0_0_24px_rgba(244,210,122,0.08)] transition duration-300 group-hover/link:border-amber-200/28 group-hover/link:shadow-[0_0_30px_rgba(244,210,122,0.14)]">
                      <Icon className="h-6 w-6" />
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}