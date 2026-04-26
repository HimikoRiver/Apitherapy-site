"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import HeroMenu from "@/components/HeroMenu";
import FooterMini from "@/components/FooterMini";
import DiseaseBeeParticles from "@/components/DiseaseBeeParticles";

const navItems = [
  { label: "Главная", href: "/#hero-track", id: "home-link" },
  { label: "Обо мне", href: "/#about", id: "about-link" },
  { label: "Услуги", href: "/#services", id: "services-link" },
  { label: "Отзывы", href: "/#reviews", id: "reviews-link" },
  { label: "Контакты", href: "/#contacts", id: "contacts-link" },
];

export default function ApiterapiyaDiseasePageClient({ pageData }) {
  const {
    backgroundImage = "/img/fon4.webp",
    diseaseImage = "/img/3dbee.webp",
    footerSocialBlock,
    hero,
    cta,
  } = pageData;

  const [menuOpen, setMenuOpen] = useState(false);
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

  return (
    <main className="relative flex min-h-screen flex-col bg-[#050507] text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src={backgroundImage}
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
        activeSection=""
        isAtTop={isAtTop}
        handleScrollEdge={handleScrollEdge}
        menuShellStyle={undefined}
        navItems={navItems}
      />

      <section className="relative z-10 w-full flex-1 px-6 pb-4 pt-8 md:px-10 md:pt-8 lg:px-16">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-6">
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 rounded-full border border-amber-200/30 bg-[#1a130e] px-4 py-2 text-sm text-[#f4d27a] transition duration-300 hover:-translate-y-0.5 hover:border-amber-200/50 hover:bg-[#221811]"
            >
              <ChevronLeft className="h-4 w-4" />
              Вернуться к услугам
            </Link>
          </div>

          <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0b0b10] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.34)] sm:p-8 md:p-10">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-200/[0.06] via-transparent to-violet-400/[0.04]" />
            <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-amber-300/12 blur-3xl" />
            <div className="pointer-events-none absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-violet-400/10 blur-3xl" />
            <div className="pointer-events-none absolute left-[16%] top-[24%] h-28 w-28 rounded-full bg-[#f3bf56]/10 blur-[50px]" />
            <div className="pointer-events-none absolute right-[12%] bottom-[20%] h-32 w-32 rounded-full bg-[#e5a62c]/8 blur-[58px]" />

            <div className="relative z-10">
              <div className="inline-flex items-center rounded-full border border-amber-200/15 bg-[#17110d]/70 px-4 py-2 text-[11px] uppercase tracking-[0.34em] text-amber-200/70 sm:text-xs">
                {hero.badge}
              </div>

              <div className="mt-5 lg:clearfix">
                <div className="mb-6 w-full lg:float-right lg:mb-6 lg:ml-8 lg:w-[360px] xl:w-[400px]">
                  <div className="relative">
                    <DiseaseBeeParticles />

                    <div className="relative z-20 overflow-hidden rounded-[28px] border border-amber-200/10">
                      <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/10 blur-[70px]" />
                      <div className="pointer-events-none absolute bottom-[10%] left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-violet-400/8 blur-[65px]" />

                      <div className="relative flex items-center justify-center p-4 sm:p-5 lg:p-6">
                        <div className="overflow-hidden rounded-[24px]">
                          <Image
                            src={diseaseImage}
                            alt={hero.title}
                            width={900}
                            height={1200}
                            sizes="(max-width: 1024px) 100vw, 400px"
                            className="block h-auto max-h-[720px] w-full object-contain object-center"
                            priority
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h1 className="max-w-3xl text-2xl font-semibold leading-tight text-[#f4d27a] sm:text-3xl md:text-4xl lg:text-[42px]">
                  {hero.title}
                </h1>

                <div className="mt-5 space-y-4 text-[15px] leading-8 text-white/78 sm:text-base">
                  {hero.paragraphs.map((paragraph, index) => (
                    <p key={`disease-paragraph-${index}`}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-8 flex flex-row flex-wrap justify-center gap-3 lg:clear-both lg:justify-start">
                  <Link
                    href={cta.primaryButton.href}
                    className="inline-flex items-center justify-center rounded-[18px] border border-amber-200/30 bg-[#1a130e] px-5 py-3.5 text-sm font-medium text-[#f4d27a] transition duration-300 hover:-translate-y-0.5 hover:border-amber-200/45 hover:bg-[#221811]"
                  >
                    {cta.primaryButton.label}
                  </Link>

                  <Link
                    href={cta.secondaryButton.href}
                    className="inline-flex items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.03] px-5 py-3.5 text-sm font-medium text-white/78 transition duration-300 hover:border-white/15 hover:bg-white/[0.05] hover:text-white"
                  >
                    {cta.secondaryButton.label}
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <FooterMini
        showSocialBlock={Boolean(footerSocialBlock)}
        socialBlock={footerSocialBlock}
        outerPaddingClassName="px-6 md:px-10 lg:px-16"
        contentWidthClassName="max-w-7xl"
      />
    </main>
  );
}