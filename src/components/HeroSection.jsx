"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";

import HeroMenu from "@/components/HeroMenu";
import HoneycombGridCanvas from "@/components/HoneycombGridCanvas";

const BeeModel = dynamic(() => import("@/components/BeeModel"), {
  ssr: false,
  loading: () => null,
});

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
  const [showBee, setShowBee] = useState(false);
  const [isTouchLike, setIsTouchLike] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    const threshold = window.innerHeight * 1.2;

    const handleBeeVisibility = () => {
      if (window.scrollY < threshold) {
        setShowBee(true);
        window.removeEventListener("scroll", handleBeeVisibility);
      }
    };

    handleBeeVisibility();
    window.addEventListener("scroll", handleBeeVisibility, { passive: true });

    return () => window.removeEventListener("scroll", handleBeeVisibility);
  }, []);

  useEffect(() => {
    const pointerMedia = window.matchMedia("(hover: none), (pointer: coarse)");

    const updatePointerMode = () => {
      setIsTouchLike(pointerMedia.matches);
    };

    updatePointerMode();

    if (pointerMedia.addEventListener) {
      pointerMedia.addEventListener("change", updatePointerMode);
      return () =>
        pointerMedia.removeEventListener("change", updatePointerMode);
    }

    pointerMedia.addListener(updatePointerMode);
    return () => pointerMedia.removeListener(updatePointerMode);
  }, []);

  useEffect(() => {
    const mobileMedia = window.matchMedia("(max-width: 639px)");

    const updateMobileViewport = () => {
      setIsMobileViewport(mobileMedia.matches);
    };

    updateMobileViewport();

    if (mobileMedia.addEventListener) {
      mobileMedia.addEventListener("change", updateMobileViewport);
      return () =>
        mobileMedia.removeEventListener("change", updateMobileViewport);
    }

    mobileMedia.addListener(updateMobileViewport);
    return () => mobileMedia.removeListener(updateMobileViewport);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {
        const hero = heroRef.current;
        if (!hero) {
          ticking = false;
          return;
        }

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

        const sectionIds = [
          "hero-track",
          "about",
          "services",
          "reviews",
          "contacts",
        ];
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
        ticking = false;
      });
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
    const mobileBeeY = isMobileViewport ? 120 - 10 * p : -20 * p;
    const mobileBeeGlowY = isMobileViewport ? 72 - 8 * p : -24 * p;

    return {
      badge: {
        transform: `translate3d(${-70 * p}px, ${-28 * p}px, 0) scale(${1 - 0.05 * p})`,
        opacity: 1 - p * 0.95,
        filter: `blur(${p * 0.9}px)`,
        transition:
          "transform 90ms linear, opacity 90ms linear, filter 90ms linear",
        willChange: "transform, opacity, filter",
      },
      title: {
        transform: `translate3d(${-130 * p}px, ${-42 * p}px, 0) scale(${1 - 0.06 * p})`,
        opacity: 1 - p * 1.02,
        filter: `blur(${p * 1.15}px)`,
        transition:
          "transform 90ms linear, opacity 90ms linear, filter 90ms linear",
        willChange: "transform, opacity, filter",
      },
      subtitle: {
        transform: `translate3d(${-90 * p}px, ${-30 * p}px, 0) scale(${1 - 0.04 * p})`,
        opacity: 1 - p * 0.9,
        filter: `blur(${p * 0.85}px)`,
        transition:
          "transform 90ms linear, opacity 90ms linear, filter 90ms linear",
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
      mobileBeeWrap: {
        transform: `translate3d(${72 * p}px, ${mobileBeeY}px, 0) scale(${1 - 0.05 * p})`,
        opacity: 1 - p * 0.98,
        transition: "transform 90ms linear, opacity 90ms linear",
        willChange: "transform, opacity",
      },
      mobileBeeGlow: {
        transform: `translate3d(${44 * p}px, ${mobileBeeGlowY}px, 0) scale(${1 - 0.04 * p})`,
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
  }, [p, scrollDirection, isMobileViewport]);

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
      className="relative h-[clamp(680px,100svh,980px)] overflow-hidden bg-[#050507]"
    >
      <Image
        src="/img/honey1.webp"
        alt="Honey"
        width={900}
        height={800}
        priority
        sizes="320px"
        className="pointer-events-none absolute left-0 -top-5 z-30 w-[320px] select-none"
        style={styles.honey}
      />

      <HoneycombGridCanvas interactive={!isTouchLike} />

      <div className="pointer-events-none absolute inset-0 z-10 bg-black/22" />

      <HeroMenu
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        handleNavClick={handleNavClick}
        activeSection={activeSection}
        isAtTop={isAtTop}
        handleScrollEdge={handleScrollEdge}
        menuShellStyle={styles.menuShell}
      />

      <div className="relative z-20 flex h-[clamp(680px,100svh,980px)] items-center px-6 py-20">
        <div className="mx-auto w-full max-w-[1500px]">
          <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            <div
              className="relative z-20 flex justify-center lg:justify-start"
              style={styles.textWrap}
            >
              <div className="flex w-full max-w-5xl flex-col text-center lg:max-w-[820px] lg:pl-8 lg:text-left xl:pl-16">
                <div className="order-2 md:order-1 md:translate-y-30">
                  <div
                    className="mx-auto mb-6 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(255,209,92,0.42),rgba(255,160,30,0.1),transparent_72%)] blur-2xl lg:mx-0 md:mb-8 md:h-32 md:w-32"
                    style={styles.glow}
                  />

                  <div className="relative z-10 -mt-10 sm:-mt-12 md:-mt-36 lg:mt-10 xl:mt-14">
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
                      <span className="block">Dr.</span>
                      <span className="block bg-gradient-to-b from-white via-[#fff3d6] to-[#f2c55c] bg-clip-text text-transparent">
                        Pchelka
                      </span>
                    </h1>

                    <div
                      className="mx-auto mt-3 inline-flex max-w-[320px] flex-col items-center rounded-2xl border border-white/16 bg-black/72 px-5 py-3 shadow-[0_12px_36px_rgba(0,0,0,0.34)] backdrop-blur-xl lg:hidden md:mt-4 md:max-w-[380px] md:px-6 md:py-4"
                      style={styles.subtitle}
                    >
                      <p className="text-sm font-medium uppercase tracking-[0.28em] text-white/95 md:text-lg">
                        Амина Мазаева
                      </p>

                      <p className="mt-2 text-[11px] uppercase tracking-[0.35em] text-white/88 md:text-sm">
                        лечение пчелиным ядом
                      </p>
                    </div>

                    <p className="hidden mt-3 text-sm font-medium uppercase tracking-[0.28em] text-white/85 lg:block lg:text-[22px]">
                      Амина Мазаева
                    </p>

                    <p
                      className="hidden mx-auto mt-5 max-w-xl text-xs uppercase tracking-[0.35em] text-white/80 lg:mx-0 md:mt-8 md:text-sm lg:block"
                      style={styles.subtitle}
                    >
                      лечение пчелиным ядом
                    </p>
                  </div>
                </div>

                <div className="order-1 mb-5 md:order-2 md:mb-7 lg:hidden">
                  <div
                    className="relative pointer-events-auto mx-auto h-[280px] w-full max-w-[420px] sm:h-[360px] sm:max-w-[560px] md:h-[500px] md:max-w-[760px]"
                    style={styles.mobileBeeWrap}
                  >
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={styles.mobileBeeGlow}
                    >
                      <div className="absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,197,92,0.24),rgba(255,160,40,0.12),transparent_72%)] blur-3xl sm:h-[240px] sm:w-[240px] md:h-[320px] md:w-[320px]" />
                    </div>

                    <div className="relative h-full w-full">
                      {showBee && <BeeModel interactive />}
                    </div>
                  </div>
                </div>
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
                  {showBee && <BeeModel interactive />}
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