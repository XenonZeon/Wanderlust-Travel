"use client";

import { useEffect, useRef } from "react";
import { reviews } from "@/content/reviews";

export default function Reviews() {
  const trackRef  = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number>(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const SPEED = 0.5; // px per frame (~30px/sec at 60fps)

    const animate = () => {
      if (!pausedRef.current) {
        track.scrollLeft += SPEED;
        // seamless loop: subtract exactly half the scroll width so position is preserved
        const half = track.scrollWidth / 2;
        if (track.scrollLeft >= half) {
          track.scrollLeft -= half;
        }
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const pause  = () => { pausedRef.current = true; };
    const resume = () => { pausedRef.current = false; };

    track.addEventListener("mouseenter",  pause);
    track.addEventListener("mouseleave",  resume);
    track.addEventListener("touchstart",  pause,  { passive: true });
    track.addEventListener("touchend",    resume);
    track.addEventListener("touchcancel", resume);

    return () => {
      cancelAnimationFrame(rafRef.current);
      track.removeEventListener("mouseenter",  pause);
      track.removeEventListener("mouseleave",  resume);
      track.removeEventListener("touchstart",  pause);
      track.removeEventListener("touchend",    resume);
      track.removeEventListener("touchcancel", resume);
    };
  }, []);

  return (
    <section id="reviews" className="bg-ink overflow-hidden py-[72px] md:py-[120px]">
      <h2 className="text-[clamp(40px,11vw,88px)] font-black tracking-[-0.03em] leading-[0.95] px-5 md:px-[60px] mb-9 md:mb-[60px] text-paper">
        Говорят<br />пассажиры
      </h2>

      {/* Carousel track — duplicated for seamless loop */}
      <div
        ref={trackRef}
        className="flex gap-[3px] overflow-x-auto pb-4 md:pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {[...reviews, ...reviews].map((review, i) => (
          <blockquote
            key={`${review.id}-${i}`}
            className="shrink-0 w-[320px] md:w-[380px] bg-ink-soft p-[28px] md:p-[40px] flex flex-col justify-between gap-6 md:gap-0"
          >
            <p className="text-[14px] md:text-[16px] leading-[1.65] text-paper italic">
              {review.text}
            </p>
            <footer className="flex flex-col gap-1">
              <cite className="not-italic font-bold text-[12px] md:text-[13px] tracking-[0.04em] text-paper">
                {review.author}
              </cite>
              <span className="text-[9px] md:text-[10px] font-semibold tracking-[0.1em] uppercase text-paper/35">
                {review.route}
              </span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
