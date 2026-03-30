"use client";

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
  return (
    <>
      <div
        className="fixed right-5 top-5 z-[100] md:right-8 md:top-8"
        style={menuShellStyle}
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
    </>
  );
}