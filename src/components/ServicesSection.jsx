"use client";

import Image from "next/image";
import { useState } from "react";
import BeeSwarm from "@/components/BeeSwarm";
import {
  ChevronDown,
  Sparkles,
  HeartHandshake,
  Shield,
  Bug,
} from "lucide-react";

const serviceCards = [
  {
    title: "Пчелоужаление",
    text: "Основной формат работы —\nвоздействие с помощью\nужаливания пчелами\nпо выбранной схеме.",
    icon: Bug,
  },
  {
    title: "Индивидуальный подход",
    text: "Схема работы подбирается\nпо состоянию человека,\nжалобам и реакции\nорганизма в процессе.",
    icon: HeartHandshake,
  },
  {
    title: "Курс процедур",
    text: "Количество сеансов,\nинтенсивность и частота\nопределяются персонально\nпод конкретный запрос.",
    icon: Shield,
  },
  {
    title: "Точечное воздействие",
    text: "Воздействие проводится\nна определённые зоны,\nчто позволяет работать\nс проблемными участками.",
    icon: Sparkles,
  },
];

const accordionItems = [
  {
    title: "Межпозвонковая грыжа",
    text: "Апитерапия применяется при межпозвонковой грыже с учетом локализации проблемы, выраженности симптомов и общего состояния человека.",
  },
  {
    title: "Неврит лицевого нерва",
    text: "При неврите лицевого нерва подбирается индивидуальная схема апитерапевтического воздействия.",
  },
  {
    title: "Воспаление седалищного нерва",
    text: "При воспалении седалищного нерва курс пчелоужаления подбирается по жалобам и зоне распространения боли.",
  },
  {
    title: "Невралгия тройничного нерва",
    text: "Работа с невралгией тройничного нерва требует точного и аккуратного подхода.",
  },
  {
    title: "Рассеянный склероз",
    text: "Апитерапия включается в индивидуальный курс работы с учетом состояния человека.",
  },
  {
    title: "Болезнь Паркинсона",
    text: "Курс апитерапии подбирается персонально с учетом самочувствия.",
  },
  {
    title: "Артрит и артроз",
    text: "Апитерапия применяется для работы с суставами и болевыми ощущениями.",
  },
  {
    title: "Подагра",
    text: "Формат апитерапии зависит от стадии состояния и текущих жалоб.",
  },
  {
    title: "Варикозное расширение вен",
    text: "Схема работы определяется после оценки состояния.",
  },
];

export default function ServicesSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="services"
      className="relative overflow-hidden border-t border-white/5 bg-black px-4 py-16 text-white sm:px-6 lg:px-8"
    >
      <div className="relative z-10 mx-auto max-w-6xl">

        {/* верхний блок с цветами */}
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr]">

          <div className="relative h-[320px] sm:h-[380px] lg:h-[460px]">
            <Image
              src="/img/flowers.png"
              alt="flowers"
              fill
              priority
              className="object-contain"
            />

            {/* летающие пчёлы */}
            <BeeSwarm />
          </div>

          <div className="lg:pl-4 xl:pl-10">
            <p className="mb-3 text-xs uppercase tracking-[0.38em] text-amber-200/65 sm:text-sm">
              Услуги
            </p>

            <p className="mt-3 max-w-xl text-sm leading-7 text-white/72 sm:text-base">
              Часто ко мне обращаются люди, которые уже прошли этапы официальной
              медицины и не получили желаемого результата. В таких случаях
              апитерапия становится следующим шагом — осознанным выбором
              человека, готового работать со своим состоянием глубже.
            </p>

            <div className="mt-6 rounded-[22px] border border-amber-200/12 bg-[#17110d]/80 p-4 backdrop-blur-sm">
              <p className="text-sm leading-7 text-amber-50/90 sm:text-[15px]">
                Бесплатная консультация и первый пробный сеанс проводятся
                бесплатно.
              </p>
            </div>
          </div>
        </div>

        {/* карточки услуг */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4 [perspective:1400px]">
          {serviceCards.map((card) => {
            const Icon = card.icon;

            return (
              <div key={card.title} className="group relative">
                <article className="relative h-full overflow-hidden rounded-[28px] border border-white/10 bg-[#0b0b10]/90 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.28)] transition-all duration-500 ease-out will-change-transform group-hover:-translate-y-2 group-hover:rotate-x-6 group-hover:border-amber-200/25 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.45)] [transform-style:preserve-3d]">

                  <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-br from-amber-200/[0.06] via-transparent to-violet-400/[0.04] opacity-80" />
                  <div className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/2 -translate-x-full skew-x-[-22deg] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-[260%] group-hover:opacity-100" />

                  <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-amber-300/10 blur-3xl transition duration-500 group-hover:bg-amber-300/15" />
                  <div className="pointer-events-none absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-violet-400/8 blur-3xl transition duration-500 group-hover:bg-violet-400/12" />

                  <div className="relative z-10 flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] border border-amber-200/15 bg-[#1a1510]/80 text-[#d6b25e] shadow-[0_10px_24px_rgba(0,0,0,0.18)]">
                      <Icon className="h-5 w-5 shrink-0 text-[#d6b25e]" />
                    </div>

                    <h3 className="text-[18px] font-semibold leading-tight text-white sm:text-[20px]">
                      {card.title}
                    </h3>
                  </div>

                  <p className="relative z-10 mt-5 whitespace-pre-line text-[15px] leading-8 text-white/80">
                    {card.text}
                  </p>
                </article>
              </div>
            );
          })}
        </div>

        {/* аккордеон состояний */}
        <div className="mt-10 rounded-[28px] border border-amber-200/10 bg-[#110d0b]/88 p-4 sm:p-5 lg:p-6">

          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.32em] text-amber-200/60 sm:text-sm">
              Направления работы
            </p>

            <h3 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
              С какими состояниями работают чаще всего
            </h3>
          </div>

          <div className="space-y-3">
            {accordionItems.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={item.title}
                  className="overflow-hidden rounded-[20px] border border-amber-200/10 bg-[rgba(255,249,239,0.96)] text-zinc-900"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
                  >
                    <span className="text-[15px] font-semibold sm:text-base">
                      {item.title}
                    </span>

                    <ChevronDown
                      size={18}
                      className={`transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-zinc-900/10 px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
                      <p className="text-sm leading-7 text-zinc-700">
                        {item.text}
                      </p>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}