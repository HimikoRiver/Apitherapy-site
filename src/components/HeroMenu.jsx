"use client";

import { useEffect, useRef } from "react";

const navItems = [
  { label: "Главная", href: "#hero-track", id: "hero-track" },
  { label: "Обо мне", href: "#about", id: "about" },
  { label: "Услуги", href: "#services", id: "services" },
  { label: "Отзывы", href: "#reviews", id: "reviews" },
  { label: "Контакты", href: "#contacts", id: "contacts" },
];

export default function HeroMenu({
  menuOpen,
  toggleMenu,
  handleNavClick,
  activeSection,
  isAtTop,
  handleScrollEdge,
  menuShellStyle,
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

    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    if (typeof handleNavClick === "function") {
      handleNavClick(event);
    }

    toggleMenu();
  };

  return (
    <>
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-[95] transition-opacity duration-300 ${
          menuOpen
            ? "pointer-events-auto opacity-100 bg-black/8 backdrop-blur-[1.5px] lg:bg-black/6 lg:backdrop-blur-none"
            : "pointer-events-none opacity-0 bg-transparent backdrop-blur-none"
        }`}
      />

      <div
        className="fixed right-5 top-5 z-[100] md:right-8 md:top-8"
        style={menuShellStyle}
      >
        <div ref={menuRef} className="relative flex flex-col items-end">
          <button
            type="button"
            onClick={toggleMenu}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
            aria-controls="hero-menu-nav"
            className={`relative z-[3] flex items-center justify-center rounded-full transition-all duration-300 ${
              menuOpen
                ? "h-10 w-10 translate-x-[-12px] translate-y-[12px] hover:bg-transparent"
                : "h-10 w-10 hover:bg-white/5"
            }`}
          >
            <span className="relative block h-5 w-7">
              <span
                className={`absolute left-0 top-0 h-[2px] bg-white transition-all duration-300 ${
                  menuOpen
                    ? "w-7 translate-y-[8px] rotate-45"
                    : "w-7"
                }`}
              />
              <span
                className={`absolute right-0 top-[8px] h-[2px] bg-white transition-all duration-300 ${
                  menuOpen ? "w-0 opacity-0" : "w-5 opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[16px] h-[2px] bg-white transition-all duration-300 ${
                  menuOpen
                    ? "w-7 translate-y-[-8px] -rotate-45"
                    : "w-6"
                }`}
              />
            </span>
          </button>

          <div
            className={`absolute right-0 top-0 origin-top-right overflow-hidden rounded-[30px] border transition-all duration-300 ${
              menuOpen
                ? "pointer-events-auto w-[146px] scale-100 border-white/10 bg-black/78 opacity-100 shadow-[0_20px_55px_rgba(0,0,0,0.48)] backdrop-blur-[6px] sm:w-[154px] md:w-[162px] lg:bg-black/72"
                : "pointer-events-none h-10 w-10 scale-95 border-transparent bg-transparent opacity-0 shadow-none backdrop-blur-none"
            }`}
          >
            <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-[linear-gradient(180deg,rgba(0,0,0,0.14),rgba(0,0,0,0.3))]" />
            <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.035),transparent_48%)]" />
            <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-[#f2c55c]/24 to-transparent" />

            <div className="relative flex flex-col items-end px-5 pb-6 pt-5 sm:px-5 md:px-6 md:pb-7 md:pt-6">
              <div className="h-8 w-8 md:h-9 md:w-9" />

              <nav
                id="hero-menu-nav"
                className={`mt-4 flex flex-col items-end gap-4 transition-all duration-300 md:mt-5 md:gap-[17px] ${
                  menuOpen
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-2 opacity-0"
                }`}
              >
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.id;

                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(event) => onNavItemClick(event, item.href)}
                      className={`rounded-md py-1 text-right text-sm uppercase tracking-[0.28em] transition-all duration-300 ${
                        isActive
                          ? "translate-x-[-4px] text-[#f2c55c]"
                          : "translate-x-0 text-white/92 hover:text-[#f2c55c]"
                      }`}
                      style={{
                        transitionDelay: menuOpen ? `${index * 50}ms` : "0ms",
                      }}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </div>
          </div>
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
    </>
  );
}