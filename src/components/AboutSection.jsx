"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  GraduationCap,
  BriefcaseBusiness,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: "/icons/14.png",
    title: "8 лет",
    text: "опыт практики",
  },
  {
    icon: "/icons/22.png",
    title: "Частная практика",
    text: "",
  },
  {
    icon: "/icons/4.png",
    title: "Спокойная и внимательная",
    text: "работа без спешки",
  },
  {
    icon: "/icons/3.png",
    title: "Индивидуальный подход",
    text: "к каждому запросу",
  },
  {
    icon: "/icons/5.png",
    title: "Подробные объяснения",
    text: "перед началом взаимодействия",
  },
];

const infoCards = [
  {
    title: "Образование",
    items: [
      "Обучалась в международном центре апитерапии в Челябинске",
      "Работала и обучалась в медицинском центре APIDARB в Грозном",
      "С 2020 года открыла частный кабинет в Грозном",
      "В 2025 году открыла филиал в г. Сунжа",
    ],
    Icon: GraduationCap,
  },
  {
    title: "Практика",
    text: `Я принимаю только после обследования и подтверждённого диагноза от врача.
Работа всегда строится на основании медицинских данных, состояния человека и его истории.
Это помогает обеспечить безопасный подход к работе.
`,
    Icon: BriefcaseBusiness,
  },
  {
    title: "Подход",
    text: `Я начинаю с общения и внимательного разбора запроса. Мне важно понять состояние человека, его ожидания и вопросы.
В процессе взаимодействия я подробно объясняю каждый этап, отвечаю на вопросы и выстраиваю работу в спокойной, безопасной атмосфере без давления и спешки.
`,
    Icon: ShieldCheck,
  },
];

export default function AboutSection() {
  const featuresRef = useRef(null);
  const [featuresVisible, setFeaturesVisible] = useState(false);

  useEffect(() => {
    const node = featuresRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFeaturesVisible(entry.isIntersecting);
      },
      { threshold: 0.22 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-white/5 bg-[#050507] px-6 py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[12%] top-24 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="absolute right-[10%] bottom-16 h-80 w-80 rounded-full bg-yellow-200/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">

        {/* верхний блок */}
        <div className="grid items-center gap-14 md:grid-cols-[0.9fr_1.1fr] md:gap-20">

          {/* фото */}
          <div className="relative mx-auto w-full max-w-[480px]">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-amber-200/15 via-amber-100/5 to-transparent blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_0_80px_rgba(255,190,80,0.12)]">
              <Image
                src="/img/amina.jpg"
                alt="Амина"
                width={700}
                height={900}
                className="h-full w-full object-cover"
                priority
              />
            </div>

            <div className="absolute -bottom-6 left-6 rounded-full border border-amber-200/20 bg-black/60 px-5 py-3 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.28em] text-amber-200/70">
                Частная практика
              </p>
            </div>
          </div>

          {/* текст */}
          <div className="max-w-xl">
            <p className="mb-4 text-sm uppercase tracking-[0.38em] text-amber-200/75">
              Обо мне
            </p>

            <div className="mb-8 h-px w-24 bg-gradient-to-r from-amber-300/80 to-transparent" />

            <p className="mb-6 text-lg leading-relaxed text-amber-300">
              Я — практикующий специалист по апитерапии и работаю в формате
              частной практики, уделяя особое внимание индивидуальному и
              спокойному подходу к каждому человеку.
            </p>

            <div className="space-y-5 text-base leading-relaxed text-white/75">
              <p>
                В своей работе я ориентируюсь на конкретный запрос и состояние
                человека. Для меня важно, чтобы пациент чувствовал себя уверенно,
                понимал, как проходит взаимодействие, и мог задать любые вопросы
                до начала и в процессе работы.
              </p>

              <p>
                Многие люди испытывают тревогу и страх перед ужаливанием —
                это естественно. В своей практике я уделяю этому особое внимание:
                подробно объясняю процесс, отвечаю на вопросы и создаю спокойную,
                безопасную атмосферу.
              </p>
            </div>
          </div>
        </div>

        {/* иконки */}
        <div ref={featuresRef} className="mt-20 border-t border-white/10 pt-12">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
            {features.map((item, index) => (
              <div
                key={index}
                className="group flex flex-col items-center text-center"
                style={{
                  opacity: featuresVisible ? 1 : 0,
                  transform: featuresVisible
                    ? "translate3d(0,0,0)"
                    : "translate3d(0,44px,0)",
                  transitionProperty: "transform, opacity",
                  transitionDuration: "700ms",
                  transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                  transitionDelay: featuresVisible ? `${index * 140}ms` : "0ms",
                }}
              >
                <div className="relative mb-6 flex min-h-[96px] items-center justify-center">
                  <div className="absolute h-24 w-24 bg-amber-300/18 blur-3xl group-hover:bg-amber-300/25" />
                  <div className="absolute h-16 w-16 bg-yellow-200/10 blur-2xl" />

                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={84}
                    height={84}
                    className="relative z-10 object-contain transition duration-300 group-hover:scale-110"
                  />
                </div>

                <p className="text-sm font-medium text-white/90">
                  {item.title}
                </p>

                {item.text && (
                  <p className="mt-1 text-sm text-white/60">
                    {item.text}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* карточки */}
<div className="mt-16 grid gap-6 md:grid-cols-3 [perspective:1400px]">
  {infoCards.map(({ title, text, items, Icon }) => (
    <div
      key={title}
      className="group relative"
    >
      <div className="relative h-full overflow-hidden rounded-[28px] border border-white/10 bg-[#0b0b10]/90 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.28)] transition-all duration-500 ease-out will-change-transform group-hover:-translate-y-2 group-hover:rotate-x-6 group-hover:border-amber-200/25 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.45)] [transform-style:preserve-3d]">

        {/* мягкое внутреннее свечение */}
        <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-br from-amber-200/[0.06] via-transparent to-violet-400/[0.04] opacity-80" />

        {/* блик */}
        <div className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/2 -translate-x-full skew-x-[-22deg] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-[260%] group-hover:opacity-100" />

        {/* мягкое внешнее glow */}
        <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-amber-300/10 blur-3xl transition duration-500 group-hover:bg-amber-300/15" />
        <div className="pointer-events-none absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-violet-400/8 blur-3xl transition duration-500 group-hover:bg-violet-400/12" />

        <div className="relative z-10">
          <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-[#d6b25e]">
            <Icon className="h-5 w-5 shrink-0 text-[#d6b25e]" />
            {title}
          </p>

          {items ? (
            <ul className="space-y-2 text-sm leading-relaxed text-white/82">
              {items.map((item, i) => (
                <li key={i} className="flex gap-2">
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
      </div>
    </section>
  );
}