"use client";

import { useEffect, useRef } from "react";
import { advantages } from "@/content/advantages";

export default function Advantages() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = Array.from(section.querySelectorAll<HTMLElement>(".advantage-item"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            el.style.opacity = "1";
            el.style.transform = "translateX(0)";
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    items.forEach((item, i) => {
      item.style.opacity = "0";
      item.style.transform = "translateX(-30px)";
      item.style.transitionDelay = `${i * 0.08}s`;
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="bg-ink-soft px-5 md:px-[60px] py-[72px] md:py-[120px]">
      <div className="flex flex-col">
        {advantages.map((item, i) => (
          <div
            key={item.num}
            className={`advantage-item flex flex-col md:flex-row md:items-start gap-[14px] md:gap-[60px] py-9 md:py-[52px] border-b border-paper/[0.08]${
              i === 0 ? " border-t" : ""
            }`}
          >
            <span className="font-black leading-none tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_rgba(245,245,240,0.18)] text-[clamp(52px,16vw,80px)] md:text-[clamp(72px,8vw,120px)] md:shrink-0 md:w-[180px]">
              {item.num}
            </span>
            <div className="md:pt-4 max-w-[580px]">
              <h3 className="text-[20px] md:text-[28px] font-bold tracking-[-0.02em] mb-[10px] md:mb-[14px] text-paper">
                {item.title}
              </h3>
              <p className="text-[13px] md:text-[15px] text-paper/[0.48] leading-[1.65]">
                {item.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
