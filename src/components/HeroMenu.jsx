"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  Home,
  UserRound,
  Flower2,
  MessageSquareHeart,
  MapPin,
} from "lucide-react";

const defaultNavItems = [
  { label: "Главная", href: "#hero-track", id: "hero-track" },
  { label: "Обо мне", href: "#about", id: "about" },
  { label: "Услуги", href: "#services", id: "services" },
  { label: "Отзывы", href: "#reviews", id: "reviews" },
  { label: "Контакты", href: "#contacts", id: "contacts" },
];

const NAV_ICON_MAP = {
  Главная: Home,
  "Обо мне": UserRound,
  Услуги: Flower2,
  Отзывы: MessageSquareHeart,
  Контакты: MapPin,
};

export default function HeroMenu({
  menuOpen,
  toggleMenu,
  handleNavClick,
  activeSection,
  isAtTop,
  handleScrollEdge,
  menuShellStyle,
  navItems = defaultNavItems,
}) {
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (event) => {
      if (!menuRef.current) return;

      if (!menuRef.current.contains(event.target)) {
        toggleMenu();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        toggleMenu();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown, {
      passive: true,
    });
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen, toggleMenu]);

  const onNavItemClick = (event, href) => {
    event.preventDefault();

    const isLocalAnchor = href.startsWith("#");
    const isHomeAnchor = href.startsWith("/#");

    if (isLocalAnchor) {
      const targetElement = document.getElementById(href.replace("#", ""));

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else if (isHomeAnchor) {
      window.location.assign(href);
      return;
    } else {
      window.location.assign(href);
      return;
    }

    if (typeof handleNavClick === "function") {
      handleNavClick(event, href);
    }

    toggleMenu();
  };

  return (
    <>
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-[95] transition-opacity duration-500 ${
          menuOpen
            ? "pointer-events-auto bg-black/18 opacity-100 backdrop-blur-[2px] lg:bg-black/8 lg:backdrop-blur-none"
            : "pointer-events-none bg-transparent opacity-0 backdrop-blur-none"
        }`}
      />

      <div
        className="review-modal-hide-control fixed right-4 top-4 z-[150] origin-top-right scale-[0.9] transition-opacity duration-300 md:right-8 md:top-8"
        style={menuShellStyle}
      >
        <div ref={menuRef} className="relative h-14 w-14">
          <button
            type="button"
            onMouseDown={(event) => event.stopPropagation()}
            onTouchStart={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              toggleMenu();
            }}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
            aria-controls="hero-menu-nav"
            className="relative z-[170] flex h-14 w-14 items-center justify-center rounded-full border border-[#f4d27a]/45 bg-[#070604]/90 text-[#ffe38b] shadow-[0_0_38px_rgba(244,210,122,0.28),inset_0_0_24px_rgba(244,210,122,0.08)] backdrop-blur-md transition-all duration-300 hover:border-[#f4d27a]/70 hover:text-[#f4d27a] hover:shadow-[0_0_52px_rgba(244,210,122,0.42),inset_0_0_26px_rgba(244,210,122,0.12)]"
          >
            <span className="pointer-events-none absolute inset-[-6px] rounded-full border border-[#f4d27a]/24" />
            <span className="pointer-events-none absolute inset-[6px] rounded-full border border-[#f4d27a]/10" />
            <span className="pointer-events-none absolute -right-1 bottom-1 h-5 w-5 rounded-full bg-[#f4d27a]/55 blur-md" />

            <svg
              className="relative h-10 w-10 drop-shadow-[0_0_10px_rgba(244,210,122,0.45)] transition-transform duration-500"
              viewBox="0 0 100 100"
            >
              <path
                className={`fill-none stroke-[#f4d27a] transition-[stroke-dasharray,stroke-dashoffset] duration-500 [stroke-linecap:round] [stroke-width:5.5] ${
                  menuOpen
                    ? "[stroke-dasharray:40_172] [stroke-dashoffset:-132px]"
                    : "[stroke-dasharray:40_172] [stroke-dashoffset:0]"
                }`}
                d="m 30,33 h 40 c 13.100415,0 14.380204,31.80258 6.899646,33.421777 -24.612039,5.327373 9.016154,-52.337577 -12.75751,-30.563913 l -28.284272,28.284272"
              />

              <path
                className={`fill-none stroke-[#fff3cc] transition-[stroke-dasharray,stroke-dashoffset] duration-500 [stroke-linecap:round] [stroke-width:5.5] ${
                  menuOpen
                    ? "[stroke-dasharray:40_111] [stroke-dashoffset:-71px]"
                    : "[stroke-dasharray:40_111] [stroke-dashoffset:0]"
                }`}
                d="m 70,50 c 0,0 -32.213436,0 -40,0 -7.786564,0 -6.428571,-4.640244 -6.428571,-8.571429 0,-5.895471 6.073743,-11.783399 12.286435,-5.570707 6.212692,6.212692 28.284272,28.284272 28.284272,28.284272"
              />

              <path
                className={`fill-none stroke-[#f4d27a] transition-[stroke-dasharray,stroke-dashoffset] duration-500 [stroke-linecap:round] [stroke-width:5.5] ${
                  menuOpen
                    ? "[stroke-dasharray:40_172] [stroke-dashoffset:-132px]"
                    : "[stroke-dasharray:40_172] [stroke-dashoffset:0]"
                }`}
                d="m 69.575405,67.073826 h -40 c -13.100415,0 -14.380204,-31.80258 -6.899646,-33.421777 24.612039,-5.327373 -9.016154,52.337577 12.75751,30.563913 l 28.284272,-28.284272"
              />
            </svg>
          </button>

          <div
            className={`absolute right-0 top-7 z-[160] origin-top-right overflow-hidden rounded-[34px] border transition-all duration-500 ease-out ${
              menuOpen
                ? "pointer-events-auto h-auto w-[354px] scale-100 border-[#f4d27a]/36 bg-[#050403]/94 opacity-100 shadow-[0_28px_90px_rgba(0,0,0,0.68),0_0_68px_rgba(244,210,122,0.26)] backdrop-blur-[12px] max-[390px]:w-[330px] sm:w-[380px]"
                : "pointer-events-none h-14 w-14 scale-90 border-transparent bg-transparent opacity-0 shadow-none backdrop-blur-none"
            }`}
          >
            <Image
              src="/img/heroMenu.webp"
              alt=""
              fill
              priority
              sizes="380px"
              className="pointer-events-none object-cover opacity-70"
            />

            <div className="pointer-events-none absolute inset-0 rounded-[34px] bg-[radial-gradient(circle_at_76%_8%,rgba(255,219,125,0.22),transparent_30%),radial-gradient(circle_at_0%_76%,rgba(218,142,31,0.18),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.10),rgba(0,0,0,0.34))]" />
            <div className="pointer-events-none absolute inset-0 rounded-[34px] shadow-[inset_0_0_30px_rgba(244,210,122,0.14),inset_0_0_95px_rgba(0,0,0,0.72)]" />

            <nav
              id="hero-menu-nav"
              className={`relative z-[2] flex flex-col gap-4 px-7 pb-9 pt-20 transition-all duration-500 max-[390px]:px-5 ${
                menuOpen
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-3 opacity-0"
              }`}
            >
              <div className="mb-1 flex items-center justify-between border-b border-[#f4d27a]/18 pb-4">
                <span className="text-[13px] font-medium uppercase tracking-[0.42em] text-[#f4d27a]">
                  Меню
                </span>

                <span className="h-px w-24 bg-gradient-to-r from-[#f4d27a]/10 via-[#f4d27a]/70 to-transparent" />
              </div>

              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                const Icon = NAV_ICON_MAP[item.label] ?? Flower2;

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(event) => onNavItemClick(event, item.href)}
                    className={`group relative grid h-[76px] grid-cols-[58px_minmax(118px,1fr)_52px_10px] items-center gap-4 overflow-hidden rounded-[20px] border-b border-[#f4d27a]/16 pr-1 transition-all duration-500 max-[390px]:grid-cols-[54px_minmax(104px,1fr)_44px_10px] max-[390px]:gap-3 ${
                      isActive
                        ? "text-[#f4d27a]"
                        : "text-[#fff7df] hover:text-[#f4d27a]"
                    }`}
                    style={{
                      transitionDelay: menuOpen
                        ? `${120 + index * 55}ms`
                        : "0ms",
                    }}
                  >
                    <span className="relative flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full border border-[#f4d27a]/42 bg-black/36 text-[#ffe38b] transition-all duration-300 group-hover:border-[#f4d27a]/70 max-[390px]:h-[54px] max-[390px]:w-[54px]">
                      <Icon className="h-7 w-7 max-[390px]:h-6 max-[390px]:w-6" />
                    </span>

                    <span className="relative whitespace-nowrap text-[18px] font-medium uppercase tracking-[0.28em] max-[390px]:text-[16px] max-[390px]:tracking-[0.22em]">
                      {item.label}
                    </span>

                    <span className="h-px w-[52px] shrink-0 bg-gradient-to-r from-[#f4d27a]/16 via-[#f4d27a]/55 to-[#f4d27a]/90 max-[390px]:w-[44px]" />

                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#ffd978] shadow-[0_0_20px_rgba(244,210,122,1)] transition-transform duration-300 group-hover:scale-125" />
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      <button
        type="button"
        onMouseDown={(event) => event.stopPropagation()}
        onTouchStart={(event) => event.stopPropagation()}
        onClick={(event) => {
          event.stopPropagation();
          handleScrollEdge();
        }}
        aria-label={isAtTop ? "Вниз" : "Наверх"}
        className={`review-modal-hide-control fixed bottom-6 right-5 z-[170] flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[#f4d27a]/45 bg-[#070604]/90 text-[#ffe38b] shadow-[0_0_38px_rgba(244,210,122,0.28),inset_0_0_24px_rgba(244,210,122,0.08)] backdrop-blur-md transition-all duration-300 hover:border-[#f4d27a]/70 hover:text-[#f4d27a] hover:shadow-[0_0_52px_rgba(244,210,122,0.42),inset_0_0_26px_rgba(244,210,122,0.12)] md:bottom-8 md:right-8 ${
          menuOpen
            ? "pointer-events-none opacity-0 md:pointer-events-auto md:opacity-100"
            : "pointer-events-auto opacity-100"
        }`}
      >
        <span className="pointer-events-none absolute inset-[-6px] rounded-full border border-[#f4d27a]/24" />
        <span className="pointer-events-none absolute inset-[6px] rounded-full border border-[#f4d27a]/10" />
        <span className="pointer-events-none absolute -right-1 bottom-1 h-5 w-5 rounded-full bg-[#f4d27a]/55 blur-md" />

        <svg
          className={`relative h-5 w-5 transition-transform duration-300 ${
            isAtTop ? "rotate-180" : "rotate-0"
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 15l6-6 6 6" />
        </svg>
      </button>
    </>
  );
}