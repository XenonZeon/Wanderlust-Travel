"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { tours } from "@/content/tours";

function formatPrice(price: number) {
  return `от ${price.toLocaleString("ru-RU")} ₽`;
}

function formatNights(n: number) {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m100 >= 11 && m100 <= 14) return `${n} ночей`;
  if (m10 === 1) return `${n} ночь`;
  if (m10 >= 2 && m10 <= 4) return `${n} ночи`;
  return `${n} ночей`;
}

// photoClass: mobile uses aspect-video; desktop uses layout-specific sizing
const CARD_DEFS = [
  { gridColumn: "1",     gridRow: "1 / 3", layout: "large", photoClass: "aspect-video md:aspect-auto md:flex-1 md:min-h-0", arrows: "→ → → → →" },
  { gridColumn: "2 / 4", gridRow: "1",     layout: "wide",  photoClass: "aspect-video md:aspect-auto md:h-full md:w-[45%]", arrows: "→ → → → →" },
  { gridColumn: "2",     gridRow: "2",     layout: "small", photoClass: "aspect-video md:aspect-auto md:h-[46%]",            arrows: "→ → →"     },
  { gridColumn: "3",     gridRow: "2",     layout: "small", photoClass: "aspect-video md:aspect-auto md:h-[46%]",            arrows: "→ → →"     },
  { gridColumn: "1 / 3", gridRow: "3",     layout: "wide",  photoClass: "aspect-video md:aspect-auto md:h-full md:w-[44%]", arrows: "→ → → → →" },
] as const;

export default function PopularTours() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>(".tour-card"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cards.forEach((c) => c.classList.add("visible"));
      return;
    }

    cards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 0.08}s`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="tours" className="px-5 md:px-[60px] pt-20 md:pt-[140px] pb-16 md:pb-[100px] bg-ink">
      <h2
        className="font-black tracking-[-0.03em] leading-[0.95] mb-10 md:mb-16 max-w-[500px]"
        style={{ fontSize: "clamp(40px, 11vw, 88px)" }}
      >
        Популярные<br />направления
      </h2>

      <div
        ref={gridRef}
        className="flex flex-col md:grid gap-[3px]"
        style={{
          gridTemplateColumns: "1.5fr 1fr 1fr",
          gridTemplateRows: "340px 280px 320px",
        }}
      >
        {tours.slice(0, 5).map((tour, i) => {
          const { gridColumn, gridRow, layout, photoClass, arrows } = CARD_DEFS[i];
          const isWide  = layout === "wide";
          const isLarge = layout === "large";
          const isSmall = layout === "small";

          return (
            <article
              key={tour.id}
              className={`tour-card overflow-hidden bg-ink-soft flex flex-col ${isWide ? "md:flex-row" : ""}`}
              style={{ gridColumn, gridRow }}
            >
              {/* Photo */}
              <div className={`tour-photo relative overflow-hidden shrink-0 ${photoClass}`}>
                <Image
                  src={tour.image}
                  alt={tour.destination}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Info */}
              <div
                className={`flex flex-col flex-1 pt-[18px] px-5 pb-5 gap-2 ${
                  isSmall
                    ? "md:pt-3 md:px-[18px] md:pb-[14px] md:gap-[6px]"
                    : "md:pt-[18px] md:px-[22px] md:pb-5 md:gap-2"
                } ${
                  isWide
                    ? "border-t border-dashed border-paper/[0.12] md:border-t-0 md:border-l"
                    : "border-t border-dashed border-paper/[0.12]"
                }`}
              >
                {/* Route */}
                <div className="flex items-center gap-[6px]">
                  <span className="text-[11px] font-extrabold tracking-[0.06em]">{tour.from}</span>
                  <span className="text-[10px] tracking-[2px]" style={{ color: "rgba(245,245,240,0.28)" }}>
                    {arrows}
                  </span>
                  <span className="text-[11px] font-extrabold tracking-[0.06em]">{tour.to}</span>
                </div>

                {/* Destination */}
                <h3
                  className={`font-extrabold tracking-[-0.02em] leading-none text-2xl ${
                    isLarge ? "md:text-[32px]" : "md:text-[26px]"
                  }`}
                >
                  {tour.destination}
                </h3>

                {/* Description */}
                {tour.description && (
                  <p className="text-[12px] leading-[1.5]" style={{ color: "rgba(245,245,240,0.45)" }}>
                    {tour.description}
                  </p>
                )}

                {/* Meta */}
                <div className="flex items-baseline gap-4 mt-auto">
                  <span
                    className="text-[9px] md:text-[10px] font-semibold tracking-[0.08em] uppercase"
                    style={{ color: "rgba(245,245,240,0.35)" }}
                  >
                    {formatNights(tour.nights)}
                  </span>
                  <span
                    className={`font-black tracking-[-0.02em] text-[22px] ${isLarge ? "md:text-[28px]" : ""}`}
                  >
                    {formatPrice(tour.price)}
                  </span>
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  className="tour-btn inline-flex items-center gap-2 mt-1 text-[10px] font-bold tracking-[0.1em] uppercase px-[18px] py-[10px] md:py-[10px] w-fit overflow-hidden"
                  style={{ border: "1px solid rgba(245,245,240,0.2)" }}
                >
                  <span className="btn-plane">✈</span> Выбрать тур
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
