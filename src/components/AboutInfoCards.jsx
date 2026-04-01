"use client";

export default function AboutInfoCards({ infoCards }) {
  return (
    <div className="mt-16 grid gap-6 md:grid-cols-3">
      {infoCards.map(({ title, text, items, Icon }) => (
        <div key={title} className="group relative">
          <div className="relative h-full overflow-hidden rounded-[28px] border border-white/10 bg-[#0b0b10]/90 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.24)] transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:border-amber-200/20 group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.34)]">
            <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-br from-amber-200/[0.05] via-transparent to-violet-400/[0.03]" />

            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-300/8 blur-3xl transition duration-500 group-hover:bg-amber-300/12" />

            <div className="relative z-10">
              <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-[#d6b25e]">
                <Icon className="h-5 w-5 shrink-0 text-[#d6b25e]" />
                {title}
              </p>

              {items ? (
                <ul className="space-y-2 text-sm leading-relaxed text-white/82">
                  {items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-[2px] text-[#d6b25e]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="whitespace-pre-line text-sm leading-relaxed text-white/80">
                  {text}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}