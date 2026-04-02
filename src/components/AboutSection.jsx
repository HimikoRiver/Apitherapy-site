"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { features, infoCards } from "@/data/aboutData";
import AboutFeatures from "@/components/AboutFeatures";
import AboutInfoCards from "@/components/AboutInfoCards";
import AboutBeeParticles from "@/components/AboutBeeParticles";

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
      { threshold: 0.3 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-white/5 bg-[#050507] px-6"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[12%] top-24 h-64 w-64 rounded-full bg-amber-300/8 blur-3xl" />
        <div className="absolute bottom-16 right-[10%] h-72 w-72 rounded-full bg-yellow-200/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-14 md:grid-cols-[0.88fr_1.12fr] md:gap-16 lg:gap-20">
          <div className="relative mx-auto w-full max-w-[440px]">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-amber-200/10 via-amber-100/5 to-transparent blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_0_55px_rgba(255,190,80,0.10)]">
              <Image
                src="/img/amina.jpg"
                alt="Амина"
                width={700}
                height={900}
                className="h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, 440px"
              />
            </div>

            <div className="absolute -bottom-5 left-5 rounded-full border border-amber-200/20 bg-black/60 px-4 py-2.5 backdrop-blur-md">
              <p className="text-[11px] uppercase tracking-[0.28em] text-amber-200/70">
                Частная практика
              </p>
            </div>
          </div>

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
                Многие люди испытывают тревогу и страх перед ужаливанием — это
                естественно. В своей практике я уделяю этому особое внимание:
                подробно объясняю процесс, отвечаю на вопросы и создаю
                спокойную, безопасную атмосферу.
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <AboutFeatures
            features={features}
            featuresRef={featuresRef}
            featuresVisible={featuresVisible}
          />

          <AboutBeeParticles />
        </div>

        <AboutInfoCards infoCards={infoCards} />
      </div>
    </section>
  );
}