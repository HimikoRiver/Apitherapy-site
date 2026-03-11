"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import HoneycombGrid from "@/components/HoneycombGrid";

const BeeModel = dynamic(() => import("@/components/BeeModel"), {
  ssr: false,
});

const navItems = [
  { label: "Главная", href: "#hero-track", id: "hero-track" },
  { label: "Обо мне", href: "#about", id: "about" },
  { label: "Услуги", href: "#services", id: "services" },
  { label: "Отзывы", href: "#reviews", id: "reviews" },
  { label: "Контакты", href: "#contacts", id: "contacts" },
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export default function HeroSection() {
  const heroRef = useRef(null);
  const lastProgressRef = useRef(0);

  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("down");
  const [activeSection, setActiveSection] = useState("hero-track");
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const hero = heroRef.current;
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      const triggerDistance = window.innerHeight * 0.72;

      const raw = clamp(-rect.top / triggerDistance, 0, 1);

      if (raw < lastProgressRef.current) {
        setScrollDirection("up");
      } else if (raw > lastProgressRef.current) {
        setScrollDirection("down");
      }

      lastProgressRef.current = raw;
      setProgress(raw);

      const scrollY = window.scrollY;
      setIsAtTop(scrollY <= 10);

      const sectionIds = ["hero-track", "about", "services", "reviews", "contacts"];
      const viewportPoint = scrollY + window.innerHeight * 0.35;

      let current = "hero-track";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;

        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;

        if (viewportPoint >= top && viewportPoint < bottom) {
          current = id;
          break;
        }
      }

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const p = useMemo(() => easeOutCubic(progress), [progress]);

  const styles = useMemo(() => {
    const honeyReturnOvershoot = scrollDirection === "up" ? (1 - p) * 16 : 0;

    return {
      badge: {
        transform: `translate3d(${-70 * p}px, ${-28 * p}px, 0) scale(${1 - 0.05 * p})`,
        opacity: 1 - p * 0.95,
        filter: `blur(${p * 0.9}px)`,
        transition: "transform 90ms linear, opacity 90ms linear, filter 90ms linear",
        willChange: "transform, opacity, filter",
      },
      title: {
        transform: `translate3d(${-130 * p}px, ${-42 * p}px, 0) scale(${1 - 0.06 * p})`,
        opacity: 1 - p * 1.02,
        filter: `blur(${p * 1.15}px)`,
        transition: "transform 90ms linear, opacity 90ms linear, filter 90ms linear",
        willChange: "transform, opacity, filter",
      },
      subtitle: {
        transform: `translate3d(${-90 * p}px, ${-30 * p}px, 0) scale(${1 - 0.04 * p})`,
        opacity: 1 - p * 0.9,
        filter: `blur(${p * 0.85}px)`,
        transition: "transform 90ms linear, opacity 90ms linear, filter 90ms linear",
        willChange: "transform, opacity, filter",
      },
      textWrap: {
        transform: `translate3d(${-95 * p}px, ${-10 * p}px, 0)`,
        opacity: 1 - p * 0.28,
        transition: "transform 90ms linear, opacity 90ms linear",
        willChange: "transform, opacity",
      },
      glow: {
        transform: `translate3d(${-45 * p}px, ${-18 * p}px, 0) scale(${1 - 0.06 * p})`,
        opacity: 0.82 - p * 0.45,
        transition: "transform 90ms linear, opacity 90ms linear",
        willChange: "transform, opacity",
      },
      beeWrap: {
        transform: `translate3d(${150 * p}px, ${-38 * p}px, 0) scale(${1 - 0.05 * p})`,
        opacity: 1 - p * 0.98,
        transition: "transform 90ms linear, opacity 90ms linear",
        willChange: "transform, opacity",
      },
      beeGlow: {
        transform: `translate3d(${95 * p}px, ${-22 * p}px, 0) scale(${1 - 0.04 * p})`,
        opacity: 0.88 - p * 0.5,
        transition: "transform 90ms linear, opacity 90ms linear",
        willChange: "transform, opacity",
      },
      honey: {
        transform: `translate3d(0px, ${-90 * p + honeyReturnOvershoot}px, 0) scale(${1 - 0.03 * p})`,
        opacity: 1 - p * 0.78,
        filter: `blur(${p * 0.75}px)`,
        transition:
          "transform 180ms cubic-bezier(0.22, 1, 0.36, 1), opacity 120ms linear, filter 120ms linear",
        willChange: "transform, opacity, filter",
      },
      menuShell: {
        opacity: 1,
      },
    };
  }, [p, scrollDirection]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  const handleScrollEdge = () => {
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
  };

  return (
    <section
      ref={heroRef}
      id="hero-track"
      className="relative min-h-screen overflow-hidden bg-[#050507]"
    >
      <img
        src="/img/honey1.png"
        alt="Honey"
        className="pointer-events-none absolute left-0 -top-5 z-30 w-[320px] select-none"
        style={styles.honey}
      />

      <HoneycombGrid />

      <div className="pointer-events-none absolute inset-0 z-10 bg-black/22" />

      <div
        className="fixed right-5 top-5 z-[100] md:right-8 md:top-8"
        style={styles.menuShell}
      >
        <div className="relative flex flex-col items-end">
          <button
            type="button"
            onClick={toggleMenu}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            className="group relative flex h-10 w-10 items-center justify-center"
          >
            <span className="relative block h-5 w-7">
              <span
                className={`absolute left-0 top-0 h-[2px] bg-white transition-all duration-300 ${
                  menuOpen
                    ? "w-7 translate-y-[8px] rotate-45"
                    : "w-7 group-hover:translate-x-[-3px]"
                }`}
              />
              <span
                className={`absolute right-0 top-[8px] h-[2px] bg-white transition-all duration-300 ${
                  menuOpen
                    ? "w-0 opacity-0"
                    : "w-5 opacity-100 group-hover:w-7"
                }`}
              />
              <span
                className={`absolute left-0 top-[16px] h-[2px] bg-white transition-all duration-300 ${
                  menuOpen
                    ? "w-7 translate-y-[-8px] -rotate-45"
                    : "w-6 group-hover:translate-x-[2px]"
                }`}
              />
            </span>
          </button>

          <nav
            className={`mt-4 flex origin-top-right flex-col items-end gap-3 transition-all duration-300 ${
              menuOpen
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-2 opacity-0"
            }`}
          >
            {navItems.map((item, index) => {
              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className={`text-sm uppercase tracking-[0.28em] transition-all duration-300 ${
                    isActive
                      ? "translate-x-[-6px] text-[#f2c55c]"
                      : "translate-x-0 text-white/92 hover:text-[#f2c55c]"
                  }`}
                  style={{
                    transitionDelay: menuOpen ? `${index * 55}ms` : "0ms",
                  }}
                >
                  {item.label}
                </a>
              );
            })}


          </nav>
        </div>
      </div>

      <button
        type="button"
        onClick={handleScrollEdge}
        aria-label={isAtTop ? "Вниз" : "Наверх"}
        className="fixed bottom-6 right-5 z-[110] flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white backdrop-blur-md transition-all duration-300 hover:border-[#f2c55c]/50 hover:bg-white/10 hover:text-[#f2c55c] md:bottom-8 md:right-8"
      >
        <svg
          className={`h-6 w-6 transition-transform duration-300 ${
            isAtTop ? "rotate-180" : "rotate-0"
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 15l6-6 6 6" />
        </svg>
      </button>

      <div className="relative z-20 flex min-h-screen items-center px-6 py-20">
        <div className="mx-auto w-full max-w-[1500px]">
          <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div
              className="pointer-events-none flex justify-center lg:justify-start"
              style={styles.textWrap}
            >
              <div className="max-w-5xl text-center lg:max-w-[820px] lg:pl-8 lg:text-left xl:pl-16">
                <div
                  className="mx-auto mb-6 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(255,209,92,0.42),rgba(255,160,30,0.1),transparent_72%)] blur-2xl lg:mx-0 md:mb-8 md:h-32 md:w-32"
                  style={styles.glow}
                />

                <p
                  className="mb-4 text-xs uppercase tracking-[0.45em] text-amber-200/80 md:mb-6 md:text-sm"
                  style={styles.badge}
                >
                  Апитерапевт
                </p>

                <h1
                  className="text-5xl font-semibold uppercase leading-[0.9] tracking-[0.04em] text-white md:text-7xl lg:text-[108px] xl:text-[120px]"
                  style={styles.title}
                >
                  <span className="block">Мазаева</span>
                  <span className="block bg-gradient-to-b from-white via-[#fff3d6] to-[#f2c55c] bg-clip-text text-transparent">
                    Амина
                  </span>
                </h1>

                <p
                  className="mx-auto mt-5 max-w-xl text-xs uppercase tracking-[0.35em] text-white/80 lg:mx-0 md:mt-8 md:text-sm"
                  style={styles.subtitle}
                >
                  лечение пчелиным ядом
                </p>
              </div>
            </div>

            <div className="relative hidden min-h-[620px] overflow-visible lg:block">
              <div
                className="pointer-events-none absolute inset-0 overflow-visible"
                style={styles.beeGlow}
              >
                <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,197,92,0.22),rgba(255,160,40,0.10),transparent_72%)] blur-3xl" />
              </div>

              <div
                className="absolute inset-0 flex items-center justify-center overflow-visible"
                style={styles.beeWrap}
              >
                <div className="h-[620px] w-full max-w-[720px] overflow-visible">
                  <BeeModel />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-32 w-full bg-gradient-to-t from-[#050507] via-[#050507]/70 to-transparent" />
    </section>
  );
}