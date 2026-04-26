"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft } from "lucide-react";
import HeroMenu from "@/components/HeroMenu";
import FooterMini from "@/components/FooterMini";
import {
  heroContent,
  asideContent,
  infoSection,
  stepsSection,
  steps,
  faqSection,
  faqItems,
  stepIcon,
} from "@/data/apiterapiyaGryzhaData";

const navItems = [
  { label: "Главная", href: "/#hero-track", id: "home-link" },
  { label: "Обо мне", href: "/#about", id: "about-link" },
  { label: "Услуги", href: "/#services", id: "services-link" },
  { label: "Отзывы", href: "/#reviews", id: "reviews-link" },
  { label: "Контакты", href: "/#contacts", id: "contacts-link" },
];

export default function ApiterapiyaGryzhaPageClient() {
  const InfoIcon = infoSection.icon;
  const StepsIcon = stepsSection.icon;
  const FaqIcon = faqSection.icon;
  const StepIcon = stepIcon;

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isAtTop, setIsAtTop] = useState(true);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const handleNavClick = useCallback(() => {
    setMenuOpen(false);
  }, []);

const handleScrollEdge = useCallback(() => {
  if (isAtTop) {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
    return;
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}, [isAtTop]);

  useEffect(() => {
    const updateScrollState = () => {
      setIsAtTop(window.scrollY < 60);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  const menuShellStyle = useMemo(() => undefined, []);

  return (
    <main className="relative min-h-screen bg-[#050507] text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/img/fon3.webp"
          alt="Фон с пчелами"
          fill
          priority
          quality={100}
          className="object-cover object-[center_top]"
        />
      </div>

      <HeroMenu
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        handleNavClick={handleNavClick}
        activeSection={activeSection}
        isAtTop={isAtTop}
        handleScrollEdge={handleScrollEdge}
        menuShellStyle={menuShellStyle}
        navItems={navItems}
      />

      <section className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6 md:pb-20 md:pt-12 lg:px-8">
        <div className="mb-6">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/72 transition duration-300 hover:border-amber-200/25 hover:bg-white/[0.05] hover:text-[#f4d27a]"
          >
            <ChevronLeft className="h-4 w-4" />
            Вернуться к услугам
          </Link>
        </div>

        <div id="hero-track" className="grid gap-2 lg:grid-cols-2">
          <div className="relative h-full overflow-hidden rounded-[32px] border border-white/10 bg-[#0b0b10]/80 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.34)] backdrop-blur-sm sm:p-8 md:p-10">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-200/[0.06] via-transparent to-violet-400/[0.04]" />
            <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-amber-300/12 blur-3xl" />
            <div className="pointer-events-none absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-violet-400/10 blur-3xl" />
            <div className="pointer-events-none absolute left-[16%] top-[24%] h-28 w-28 rounded-full bg-[#f3bf56]/10 blur-[50px]" />
            <div className="pointer-events-none absolute right-[12%] bottom-[20%] h-32 w-32 rounded-full bg-[#e5a62c]/8 blur-[58px]" />

            <div className="relative z-10">
              <div className="inline-flex items-center rounded-full border border-amber-200/15 bg-[#17110d]/70 px-4 py-2 text-[11px] uppercase tracking-[0.34em] text-amber-200/70 sm:text-xs">
                {heroContent.badge}
              </div>

              <h1 className="mt-5 max-w-4xl text-3xl font-semibold leading-tight text-[#f4d27a] sm:text-4xl md:text-5xl">
                {heroContent.title}
              </h1>

              <div className="mt-5 max-w-3xl space-y-4 text-[15px] leading-8 text-white/78 sm:text-base">
                {heroContent.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          <aside className="relative h-full overflow-hidden rounded-[30px] border border-amber-200/10 bg-[#110d0b]/82 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-sm sm:p-7">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-200/[0.05] via-transparent to-transparent" />
            <div className="pointer-events-none absolute right-[10%] top-[18%] h-28 w-28 rounded-full bg-[#efb84c]/10 blur-[48px]" />
            <div className="pointer-events-none absolute left-[14%] bottom-[16%] h-24 w-24 rounded-full bg-[#f7d181]/8 blur-[44px]" />

            <div className="relative z-10 flex h-full flex-col">
              <p className="text-xs uppercase tracking-[0.32em] text-amber-200/60">
                {asideContent.eyebrow}
              </p>

              <h2 className="mt-3 text-2xl font-semibold text-white">
                {asideContent.title}
              </h2>

              <div className="mt-5 space-y-4 text-sm leading-7 text-white/78">
                {asideContent.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-6 rounded-[22px] border border-amber-200/12 bg-[#17110d]/75 p-4">
                <p className="text-sm leading-7 text-amber-50/90">
                  {asideContent.note}
                </p>
              </div>

              <div className="relative mt-6 min-h-[220px] flex-1 sm:min-h-[260px] lg:min-h-[300px]">
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/10 blur-[70px]" />
                <div className="pointer-events-none absolute bottom-[10%] left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-violet-400/8 blur-[65px]" />

                <div className="relative h-full w-full overflow-hidden rounded-[28px]">
                  <Image
                    src="/img/3dbee.webp"
                    alt="Декоративное изображение пчелы"
                    fill
                    sizes="(max-width: 1024px) 60vw, 28vw"
                    className="object-cover object-center drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
                  />
                </div>
              </div>

              <div className="mt-auto flex flex-col gap-3 pt-4">
                <Link
                  href={asideContent.primaryButton.href}
                  className="inline-flex items-center justify-center rounded-[18px] border border-amber-200/30 bg-[#1a130e] px-5 py-3.5 text-sm font-medium text-[#f4d27a] transition duration-300 hover:-translate-y-0.5 hover:border-amber-200/45 hover:bg-[#221811]"
                >
                  {asideContent.primaryButton.label}
                </Link>

                <Link
                  href={asideContent.secondaryButton.href}
                  className="inline-flex items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.03] px-5 py-3.5 text-sm font-medium text-white/78 transition duration-300 hover:border-white/15 hover:bg-white/[0.05] hover:text-white"
                >
                  {asideContent.secondaryButton.label}
                </Link>
              </div>
            </div>
          </aside>
        </div>

        <section id="history" className="mt-2 grid gap-2 lg:grid-cols-2">
          <div className="h-full rounded-[30px] border border-white/10 bg-[#0b0b10]/78 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-sm sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-[16px] border border-amber-200/15 bg-[#1a1510]/80 text-[#d6b25e]">
                <InfoIcon className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-amber-200/58 sm:text-sm">
                  {infoSection.eyebrow}
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
                  {infoSection.title}
                </h2>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-sm leading-8 text-white/78 sm:text-[15px]">
              {infoSection.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div
            id="course-steps"
            className="h-full rounded-[30px] border border-amber-200/10 bg-[#100d0b]/84 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-sm sm:p-8"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-[16px] border border-amber-200/15 bg-[#1a1510]/80 text-[#d6b25e]">
                <StepsIcon className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-amber-200/58 sm:text-sm">
                  {stepsSection.eyebrow}
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
                  {stepsSection.title}
                </h2>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {steps.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[18px] border border-white/8 bg-white/[0.03] px-4 py-4"
                >
                  <StepIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#d6b25e]" />
                  <p className="text-sm leading-7 text-white/78">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="mt-2 rounded-[32px] border border-white/10 bg-[#0b0b10]/80 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.28)] backdrop-blur-sm sm:p-8 md:p-10"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[16px] border border-amber-200/15 bg-[#1a1510]/80 text-[#d6b25e]">
              <FaqIcon className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-amber-200/58 sm:text-sm">
                {faqSection.eyebrow}
              </p>
              <h2 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
                {faqSection.title}
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-2 md:grid-cols-2">
            {faqItems.map((item) => (
              <article
                key={item.question}
                className="rounded-[22px] border border-amber-200/10 bg-[#120f0d]/75 p-5"
              >
                <h3 className="text-base font-semibold leading-7 text-white">
                  {item.question}
                </h3>
                <p className="mt-2 text-sm leading-7 text-white/74">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </section>
      </section>
      <div className="relative z-10">
  <FooterMini />
</div>
    </main>
  );
}