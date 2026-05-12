"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, X } from "lucide-react";

import { features, infoCards } from "@/data/aboutData";
import AboutFeatures from "@/components/AboutFeatures";
import AboutInfoCards from "@/components/AboutInfoCards";
import AboutBeeParticles from "@/components/AboutBeeParticles";

export default function AboutSection() {
  const featuresRef = useRef(null);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [certificateOpen, setCertificateOpen] = useState(false);

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

  useEffect(() => {
    if (!certificateOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setCertificateOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [certificateOpen]);

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

            <p className="gold-text-flow mb-6 text-lg leading-relaxed drop-shadow-[0_0_14px_rgba(214,168,79,0.18)]">
              Я — практикующий специалист по апитерапии и веду частную
              практику, уделяя внимание индивидуальному подходу к каждому
              человеку.
            </p>

            <div className="space-y-5 text-base leading-relaxed text-white/75">
              <p>
                В своей работе я ориентируюсь на конкретный запрос, состояние
                пациента и особенности его организма. Для меня важно, чтобы
                человек понимал, как проходит курс, какие этапы его ждут и какие
                вопросы стоит обсудить до начала процедур.
              </p>

              <p>
                Многие испытывают тревогу перед ужаливанием, особенно если
                сталкиваются с апитерапией впервые. Поэтому перед началом я
                объясняю порядок работы, отвечаю на вопросы и помогаю спокойно
                пройти первые этапы курса.
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

        <div className="relative z-10 my-12 flex justify-center md:my-14">
          <motion.button
            type="button"
            onClick={() => setCertificateOpen(true)}
            whileHover={{ y: -3, scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-amber-300/30 bg-[#130d08]/90 px-6 py-3.5 text-sm font-medium uppercase tracking-[0.22em] text-amber-100 shadow-[0_18px_55px_rgba(0,0,0,0.34),0_0_34px_rgba(245,180,60,0.12)] backdrop-blur-md transition-all duration-300 hover:border-amber-200/55 hover:bg-[#1c1209]"
          >
            <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(255,220,130,0.18),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="pointer-events-none absolute -left-12 top-0 h-full w-12 skew-x-[-18deg] bg-white/10 opacity-0 blur-sm transition-all duration-700 group-hover:left-[115%] group-hover:opacity-100" />

            <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-amber-200/28 bg-amber-300/10 text-amber-200 shadow-[0_0_24px_rgba(245,180,60,0.16)]">
              <Award size={18} />
            </span>

            <span className="relative">Посмотреть сертификат</span>
          </motion.button>
        </div>

        <AboutInfoCards infoCards={infoCards} />
      </div>

      <AnimatePresence>
        {certificateOpen && (
          <motion.div
            className="fixed inset-0 z-[320] flex items-center justify-center overflow-hidden bg-black/72 px-4 py-5 backdrop-blur-[7px] md:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Сертификат специалиста"
          >
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.97 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[760px] overflow-hidden rounded-[28px] border border-amber-200/24 bg-[#0b0705]/96 p-3 shadow-[0_35px_100px_rgba(0,0,0,0.58),0_0_70px_rgba(245,180,60,0.16)] md:p-4"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,214,120,0.16),transparent_34%),radial-gradient(circle_at_100%_100%,rgba(190,110,20,0.14),transparent_36%)]" />

              <button
                type="button"
                onClick={() => setCertificateOpen(false)}
                className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-black/58 text-white/82 shadow-[0_12px_34px_rgba(0,0,0,0.32)] backdrop-blur-md transition-all duration-300 hover:border-amber-200/42 hover:text-amber-100"
                aria-label="Закрыть сертификат"
              >
                <X size={18} />
              </button>

              <div className="relative z-10 overflow-hidden rounded-[22px] border border-white/10 bg-black/30">
                <Image
                  src="/img/sert.jpg"
                  alt="Сертификат по апитерапии"
                  width={1400}
                  height={980}
                  className="mx-auto h-auto max-h-[78dvh] w-auto max-w-full select-none object-contain"
                  sizes="(max-width: 768px) 92vw, 760px"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}