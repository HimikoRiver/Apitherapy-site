"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Loader2, Send, Star, X } from "lucide-react";

const REVIEW_CATEGORIES = [
  "Общее",
  "Грыжа",
  "Варикоз",
  "Неврит лицевого нерва",
  "Воспаление седалищного нерва",
  "Невралгия тройничного нерва",
  "Артрит / артроз",
  "Рассеянный склероз",
  "Болезнь Паркинсона",
];

const INITIAL_FORM = {
  authorName: "",
  email: "",
  category: "Общее",
  rating: 5,
  text: "",
};

export default function ReviewFormModal({ open, onClose, onSuccess }) {
  const shouldReduceMotion = useReducedMotion();
  const scrollYRef = useRef(0);

  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const isSubmitting = status === "submitting";

  useEffect(() => {
    if (!open) return;

    scrollYRef.current = window.scrollY;

    const html = document.documentElement;
    const body = document.body;

    const previousHtmlOverflowY = html.style.overflowY;
    const previousHtmlScrollbarGutter = html.style.scrollbarGutter;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPosition = body.style.position;
    const previousBodyTop = body.style.top;
    const previousBodyLeft = body.style.left;
    const previousBodyRight = body.style.right;
    const previousBodyWidth = body.style.width;

    body.classList.add("review-form-modal-open");

    html.style.overflowY = "scroll";
    html.style.scrollbarGutter = "stable";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollYRef.current}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    return () => {
      body.classList.remove("review-form-modal-open");

      html.style.overflowY = previousHtmlOverflowY;
      html.style.scrollbarGutter = previousHtmlScrollbarGutter;
      body.style.overflow = previousBodyOverflow;
      body.style.position = previousBodyPosition;
      body.style.top = previousBodyTop;
      body.style.left = previousBodyLeft;
      body.style.right = previousBodyRight;
      body.style.width = previousBodyWidth;

      window.scrollTo(0, scrollYRef.current);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !isSubmitting) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, isSubmitting, onClose]);

  useEffect(() => {
    if (!open) return;

    setMessage("");
    setStatus("idle");
  }, [open]);

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(data?.message || "Не удалось отправить отзыв.");
        return;
      }

      setStatus("success");
      setMessage(
        data?.message || "Спасибо! Отзыв отправлен и появится после проверки."
      );
      setForm(INITIAL_FORM);
      onSuccess?.();
    } catch {
      setStatus("error");
      setMessage("Не удалось отправить отзыв. Проверьте соединение.");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center overflow-hidden overscroll-none bg-black/64 px-4 py-4 backdrop-blur-[5px] md:px-5 md:py-6"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={shouldReduceMotion ? {} : { opacity: 1 }}
          exit={shouldReduceMotion ? {} : { opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="review-form-title"
        >
          <motion.div
            initial={
              shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.97 }
            }
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
            exit={
              shouldReduceMotion ? {} : { opacity: 0, y: 18, scale: 0.98 }
            }
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative max-h-[90dvh] w-full max-w-2xl overflow-hidden rounded-[24px] border border-amber-300/18 bg-[#130d08]/96 shadow-[0_30px_90px_rgba(0,0,0,0.42)] md:rounded-[28px]"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-[-36px] top-[-18px] h-36 w-36 rounded-full bg-amber-300/10 blur-3xl" />
              <div className="absolute right-[-18px] bottom-[-26px] h-32 w-32 rounded-full bg-orange-300/8 blur-3xl" />
            </div>

            <div className="relative z-10 max-h-[90dvh] overflow-y-auto overscroll-contain px-4 py-4 md:px-7 md:py-7">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-2 text-[10px] uppercase tracking-[0.24em] text-amber-200/80">
                    Новый отзыв
                  </p>

                  <h3
                    id="review-form-title"
                    className="text-xl font-semibold text-white md:text-2xl"
                  >
                    Оставить отзыв
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/14 bg-[#1a120e]/92 text-white/82 transition-all duration-300 hover:border-amber-300/28 hover:text-white disabled:pointer-events-none disabled:opacity-50"
                  aria-label="Закрыть форму"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-amber-100/80">
                      Имя
                    </span>
                    <input
                      type="text"
                      value={form.authorName}
                      onChange={(event) =>
                        updateField("authorName", event.target.value)
                      }
                      disabled={isSubmitting}
                      placeholder="Ваше имя"
                      className="w-full rounded-2xl border border-amber-300/16 bg-black/22 px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/32 focus:border-amber-300/42 disabled:opacity-60"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-amber-100/80">
                      Почта
                    </span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) =>
                        updateField("email", event.target.value)
                      }
                      disabled={isSubmitting}
                      placeholder="example@mail.com"
                      className="w-full rounded-2xl border border-amber-300/16 bg-black/22 px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/32 focus:border-amber-300/42 disabled:opacity-60"
                      required
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-amber-100/80">
                    Категория
                  </span>
                  <select
                    value={form.category}
                    onChange={(event) =>
                      updateField("category", event.target.value)
                    }
                    disabled={isSubmitting}
                    className="w-full rounded-2xl border border-amber-300/16 bg-black/22 px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-amber-300/42 disabled:opacity-60"
                    required
                  >
                    {REVIEW_CATEGORIES.map((category) => (
                      <option
                        key={category}
                        value={category}
                        className="bg-[#130d08] text-white"
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                </label>

                <div>
                  <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-amber-100/80">
                    Оценка
                  </span>

                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((ratingValue) => {
                      const active = ratingValue <= form.rating;

                      return (
                        <button
                          key={ratingValue}
                          type="button"
                          onClick={() => updateField("rating", ratingValue)}
                          disabled={isSubmitting}
                          className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 disabled:pointer-events-none disabled:opacity-60 ${
                            active
                              ? "border-amber-300/42 bg-amber-300/14 text-amber-200"
                              : "border-white/12 bg-black/18 text-white/36 hover:border-amber-300/28 hover:text-amber-100"
                          }`}
                          aria-label={`Поставить оценку ${ratingValue}`}
                        >
                          <Star
                            size={17}
                            fill={active ? "currentColor" : "none"}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-amber-100/80">
                    Отзыв
                  </span>
                  <textarea
                    value={form.text}
                    onChange={(event) => updateField("text", event.target.value)}
                    disabled={isSubmitting}
                    placeholder="Напишите ваш отзыв..."
                    rows={6}
                    className="min-h-[150px] w-full resize-none rounded-2xl border border-amber-300/16 bg-black/22 px-4 py-3 text-sm leading-6 text-white outline-none transition-all duration-300 placeholder:text-white/32 focus:border-amber-300/42 disabled:opacity-60"
                    required
                  />
                </label>

                {message && (
                  <p
                    className={`rounded-2xl border px-4 py-3 text-sm leading-6 ${
                      status === "success"
                        ? "border-emerald-300/20 bg-emerald-400/10 text-emerald-100"
                        : "border-red-300/20 bg-red-400/10 text-red-100"
                    }`}
                  >
                    {message}
                  </p>
                )}

                <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs leading-5 text-white/48">
                    Почта нужна только для проверки отзыва и не будет показана
                    на сайте.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-amber-300/28 bg-[#2c1c0a]/95 px-5 py-3 text-sm font-medium text-amber-100 transition-all duration-300 hover:border-amber-300/48 hover:bg-[#38230d] disabled:pointer-events-none disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <Loader2 size={17} className="animate-spin" />
                    ) : (
                      <Send size={17} />
                    )}
                    Отправить
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}