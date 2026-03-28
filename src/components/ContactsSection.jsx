"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import { MapPin, Clock3, Send, MousePointer2 } from "lucide-react";

const offices = [
  {
    city: "г. Грозный",
    address: "ул. Гикало, 6",
    schedule: "рабочие дни ПН, СР, ПТ с 10 до 17",
  },
  {
    city: "г. Сунжа",
    address: "ул. Свердлова, 1/2",
    schedule: "рабочие дни ВТ, ЧТ, СБ с 10 до 17",
  },
];

const socials = [
  {
    name: "Telegram",
    href: "https://t.me/apitetapiya_grozny",
    icon: "/icons/icons8-телеграм-96.png",
    qr: "/icons/qr-telegram.png",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/79659671999",
    icon: "/icons/icons8-whatsapp-96.png",
    qr: "/icons/qr-whatsapp.png",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/apiterapiya_grozny",
    icon: "/icons/icons8-instagram-96.png",
    qr: "/icons/qr-instagram.png",
  },
];

function ContactsMap() {
  const [isInteractive, setIsInteractive] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0b0b10]/90 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(135deg,rgba(255,214,102,0.08),transparent_24%,transparent_75%,rgba(255,214,102,0.06))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />

      <iframe
        src="https://yandex.ru/map-widget/v1/?ll=45.692174%2C43.324869&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgoyMjA4NTAwNjQxEmPQoNC-0YHRgdC40Y8sINCn0LXRh9C10L3RgdC60LDRjyDQoNC10YHQv9GD0LHQu9C40LrQsCwg0JPRgNC-0LfQvdGL0LksINGD0LvQuNGG0LAg0JPQuNC60LDQu9C-LCA20JIiCg0hyTZCFetMLUI%2C&z=16.68"
        title="Карта филиалов"
        loading="lazy"
        className="relative z-0 h-[320px] w-full md:h-[380px] lg:h-[440px]"
        style={{
          pointerEvents: isInteractive ? "auto" : "none",
          filter:
            "grayscale(0.2) contrast(1.05) brightness(0.85) saturate(0.85)",
        }}
      />

      {!isInteractive && (
        <button
          type="button"
          onClick={() => setIsInteractive(true)}
          className="absolute inset-0 z-10 flex items-center justify-center bg-[#050507]/30 backdrop-blur-[2px] transition duration-300 hover:bg-[#050507]/24"
          aria-label="Активировать карту"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0b0b10]/90 px-5 py-3 text-sm text-white/80 shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
            <MousePointer2 className="h-4 w-4 text-amber-200" />
            <span>Нажмите, чтобы активировать карту</span>
          </div>
        </button>
      )}
    </div>
  );
}

export default function ContactsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.18 });

  const topControls = useAnimation();
  const bottomControls = useAnimation();

  useEffect(() => {
    if (!isInView) return;

    const runSequence = async () => {
      await topControls.start({
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.95,
          ease: [0.22, 1, 0.36, 1],
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 450));

      await bottomControls.start({
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        },
      });
    };

    runSequence();
  }, [isInView, topControls, bottomControls]);

  return (
    <section
      ref={ref}
      id="contacts"
      className="relative overflow-hidden border-t border-white/5 bg-[#050507] px-6 py-16 md:px-10 md:py-20 lg:px-16 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,180,60,0.08),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent_22%),linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_35%)]" />
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(circle at center, black 35%, transparent 95%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, black 35%, transparent 95%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mb-10 max-w-3xl md:mb-12"
        >
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-amber-200/70">
            Контакты
          </p>

          <h2 className="max-w-4xl text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
            Связаться со мной
          </h2>
        </motion.div>

        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ x: 900, opacity: 0 }}
            animate={topControls}
            className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-5 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm md:p-7"
          >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,214,102,0.10),transparent_24%,transparent_75%,rgba(255,214,102,0.06))]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />

            <div className="relative mb-8 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-200/20 bg-amber-300/10 shadow-[0_0_30px_rgba(255,191,73,0.12)]">
                <MapPin className="h-5 w-5 text-amber-200" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-amber-200/65">
                  филиалы
                </p>
                <p className="text-lg font-medium text-white">Адреса приема</p>
              </div>
            </div>

            <div className="grid gap-5">
              {offices.map((office, index) => (
                <motion.div
                  key={office.city + office.address}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.12 + index * 0.08,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -4, scale: 1.006 }}
                  className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-[#07070b]/95 p-5 transition-all duration-300 hover:border-amber-200/25 hover:bg-[#0b0b10] hover:shadow-[0_18px_50px_rgba(245,176,65,0.12)] md:p-6"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,210,110,0.12),transparent_26%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute -left-20 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-amber-300/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute -right-20 bottom-0 h-28 w-28 rounded-full bg-orange-400/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                    <div className="max-w-xl">
                      <h3 className="text-2xl font-semibold text-white md:text-[28px]">
                        {office.city}
                      </h3>
                      <p className="mt-2 text-lg text-amber-100/90">
                        {office.address}
                      </p>
                    </div>

                    <div className="flex min-w-[220px] items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 transition-colors duration-300 group-hover:border-amber-200/15 group-hover:bg-white/[0.05]">
                      <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-amber-200/85" />
                      <p className="text-sm leading-6 text-white/70">
                        {office.schedule}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6">
              <ContactsMap />
            </div>
          </motion.div>

          <motion.div
            initial={{ x: -900, opacity: 0 }}
            animate={bottomControls}
            className="relative w-full overflow-visible rounded-[30px] border border-white/10 bg-white/[0.03] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.32)] backdrop-blur-sm md:p-6"
          >
            <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-[radial-gradient(circle_at_top_left,rgba(255,220,120,0.10),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_45%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/25 to-transparent" />

            <div className="relative flex w-full flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
              <div className="shrink-0">
                <div className="flex flex-col items-center gap-3 sm:flex-row md:items-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-200/20 bg-amber-300/10 shadow-[0_0_30px_rgba(255,191,73,0.12)]">
                    <Send className="h-5 w-5 text-amber-200" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-amber-200/65">
                      онлайн
                    </p>
                    <p className="text-lg font-medium text-white">
                      Мессенджеры и соцсети
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex w-full justify-center md:justify-end">
                <div className="flex items-center justify-center gap-3 md:gap-4">
                  {socials.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center transition-all duration-500"
                    >
                      <div className="pointer-events-none absolute bottom-[calc(100%+14px)] left-1/2 z-30 hidden w-[148px] -translate-x-1/2 translate-y-4 rounded-[22px] border border-amber-200/20 bg-[#0b0b10]/95 p-3 opacity-0 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:block">
                        <div className="absolute left-1/2 top-full h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-amber-200/20 bg-[#0b0b10]/95" />

                        <div className="mb-2 text-center text-[10px] uppercase tracking-[0.22em] text-amber-200/70">
                          {item.name}
                        </div>

                        <div className="overflow-hidden rounded-[16px] border border-white/10 bg-white p-2">
                          <img
                            src={item.qr}
                            alt={`${item.name} QR`}
                            className="h-auto w-full rounded-[10px]"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3 transition-all duration-500 group-hover:gap-10">
                        <motion.div
                          whileHover={{ y: -6, scale: 1.05 }}
                          transition={{ duration: 0.22, ease: "easeOut" }}
                        >
                          <Link
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={item.name}
                            className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] transition-all duration-300 hover:border-amber-200/30 hover:bg-white/[0.07] hover:shadow-[0_18px_40px_rgba(245,176,65,0.18)]"
                          >
                            <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,rgba(255,220,120,0.16),transparent_68%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <Image
                              src={item.icon}
                              alt={item.name}
                              width={34}
                              height={34}
                              className="relative h-8 w-8 object-contain md:h-9 md:w-9"
                            />
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="pt-8">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="mt-5 flex flex-col gap-3 text-white/45 md:flex-row md:items-end md:justify-between">
              <div className="text-xs uppercase tracking-[0.18em] text-white/40">
                © 2026 Himiko River — Все права защищены
              </div>

              <div className="max-w-3xl text-[10px] leading-5 text-white/28 md:text-right">
                Instagram принадлежит компании Meta Platforms Inc., деятельность
                которой признана экстремистской и запрещена на территории
                Российской Федерации. Упоминание осуществляется исключительно в
                информационных целях.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}