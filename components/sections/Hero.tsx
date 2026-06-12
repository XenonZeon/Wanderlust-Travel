"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

function SearchField({
  id,
  label,
  placeholder,
  type = "text",
  noBorder = false,
}: {
  id: string;
  label: string;
  placeholder?: string;
  type?: string;
  noBorder?: boolean;
}) {
  return (
    <div
      className="flex-1 flex flex-col py-5 px-6"
      style={noBorder ? {} : { borderRight: "1px solid rgba(245,245,240,0.1)" }}
    >
      <label
        htmlFor={id}
        className="block text-[9px] font-bold tracking-[0.12em] uppercase mb-[6px]"
        style={{ color: "rgba(245,245,240,0.38)" }}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        className="bg-transparent border-none outline-none text-[14px] font-medium text-paper w-full placeholder:text-paper/30"
        autoComplete="off"
      />
    </div>
  );
}

function MobileSearchField({
  id,
  label,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div
      className="flex flex-col"
      style={{ background: "rgba(13,13,13,0.8)", backdropFilter: "blur(12px)", padding: "14px 16px" }}
    >
      <label
        htmlFor={id}
        className="block text-[8px] font-bold tracking-[0.12em] uppercase mb-[5px]"
        style={{ color: "rgba(245,245,240,0.35)" }}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        className="bg-transparent border-none outline-none text-[14px] font-semibold text-paper w-full placeholder:text-paper/[0.28]"
        autoComplete="off"
      />
    </div>
  );
}

export default function Hero() {
  const pathRef         = useRef<SVGPathElement>(null);
  const planeRef        = useRef<SVGTextElement>(null);
  const clipRectRef     = useRef<SVGRectElement>(null);
  const mobilePathRef   = useRef<SVGPathElement>(null);
  const mobilePlaneRef  = useRef<SVGTextElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (window.innerWidth >= 768) {
      // ── Desktop: clipPath route reveal + plane ──
      const path     = pathRef.current;
      const plane    = planeRef.current;
      const clipRect = clipRectRef.current;
      if (!path || !plane || !clipRect) return;

      if (reduced) { clipRect.setAttribute("width", "1700"); return; }

      const len         = path.getTotalLength();
      const DURATION    = 2800;
      const ROUTE_DELAY = 300;
      const PLANE_DELAY = 400;
      let startTime: number | null = null;
      let raf: number;

      const ease = (t: number) =>
        t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      const tick = (ts: number) => {
        if (startTime === null) startTime = ts;
        const elapsed = ts - startTime;

        if (elapsed >= ROUTE_DELAY) {
          const t = Math.min((elapsed - ROUTE_DELAY) / DURATION, 1);
          clipRect.setAttribute("width", String(ease(t) * 1700));
        }
        if (elapsed >= PLANE_DELAY) {
          const raw = Math.min((elapsed - PLANE_DELAY) / DURATION, 1);
          const t   = ease(raw);
          const pt  = path.getPointAtLength(t * len);
          const pt2 = path.getPointAtLength(Math.min((t + 0.01) * len, len));
          const angle = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * 180 / Math.PI;
          plane.setAttribute("transform", `translate(${pt.x}, ${pt.y}) rotate(${angle})`);
          plane.style.opacity = String(
            raw < 0.05 ? raw / 0.05 : raw > 0.88 ? (1 - raw) / 0.12 : 1
          );
        }
        const done = elapsed >= ROUTE_DELAY + DURATION && elapsed >= PLANE_DELAY + DURATION;
        if (!done) raf = requestAnimationFrame(tick);
      };

      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    } else {
      // ── Mobile: plane follows path (route drawn by CSS) ──
      const mobilePath  = mobilePathRef.current;
      const mobilePlane = mobilePlaneRef.current;
      if (!mobilePath || !mobilePlane) return;
      if (reduced) return;

      const len      = mobilePath.getTotalLength();
      const DURATION = 2600;
      let startTime: number | null = null;
      let raf: number;

      const ease = (t: number) =>
        t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      const animate = (ts: number) => {
        if (startTime === null) startTime = ts;
        const raw = Math.min((ts - startTime) / DURATION, 1);
        const t   = ease(raw);
        const pt  = mobilePath.getPointAtLength(t * len);
        const pt2 = mobilePath.getPointAtLength(Math.min((t + 0.01) * len, len));
        const angle = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * 180 / Math.PI;
        mobilePlane.setAttribute("transform", `translate(${pt.x}, ${pt.y}) rotate(${angle})`);
        mobilePlane.style.opacity = String(
          raw < 0.05 ? raw / 0.05 : raw > 0.88 ? (1 - raw) / 0.12 : 1
        );
        if (raw < 1) raf = requestAnimationFrame(animate);
      };

      const timer = setTimeout(() => { raf = requestAnimationFrame(animate); }, 600);
      return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-ink"
    >
      {/* Mobile: full-bleed image + bottom-to-top gradient */}
      <div className="absolute inset-0 overflow-hidden md:hidden">
        <Image
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80"
          alt=""
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(13,13,13,1) 0%, rgba(13,13,13,.7) 35%, rgba(13,13,13,.25) 100%)",
          }}
        />
      </div>

      {/* Desktop: right-aligned with mask */}
      <div
        className="hidden md:block absolute overflow-hidden"
        style={{
          right: "-60px",
          top: "-30px",
          width: "68%",
          height: "110%",
          WebkitMaskImage: "linear-gradient(to left, black 55%, transparent 100%)",
          maskImage: "linear-gradient(to left, black 55%, transparent 100%)",
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80"
          alt=""
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
          sizes="68vw"
        />
      </div>

      {/* Mobile SVG route (CSS draw) + plane (JS) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-[2] md:hidden"
        viewBox="0 0 390 700"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          ref={mobilePathRef}
          className="hero-route-mobile"
          fill="none"
          stroke="rgba(245,245,240,0.3)"
          strokeWidth="1.2"
          strokeDasharray="6 5"
          d="M 430,650 C 350,520 280,380 210,260 C 155,160 80,90 -40,30"
        />
        <text
          ref={mobilePlaneRef}
          fontSize="18"
          fill="rgba(245,245,240,0.85)"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ opacity: 0, userSelect: "none" }}
          aria-hidden="true"
        >
          ✈
        </text>
      </svg>

      {/* Desktop SVG route + animated plane */}
      <svg
        className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-[2]"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <clipPath id="hero-route-clip">
            <rect ref={clipRectRef} x="-100" y="-50" width="0" height="1000" />
          </clipPath>
        </defs>
        <path
          ref={pathRef}
          clipPath="url(#hero-route-clip)"
          fill="none"
          stroke="rgba(245,245,240,0.35)"
          strokeWidth="1.5"
          strokeDasharray="8 6"
          d="M -60,820 C 120,700 260,480 520,360 C 720,270 960,240 1200,200 C 1340,180 1420,160 1500,140"
        />
        <text
          ref={planeRef}
          fontSize="22"
          fill="rgba(245,245,240,0.85)"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ opacity: 0, userSelect: "none" }}
          aria-hidden="true"
        >
          ✈
        </text>
      </svg>

      {/* Headline */}
      <div className="relative z-[3] mb-8 md:mb-[60px] max-w-[660px] px-5 md:px-[60px]">
        <p
          className="text-[10px] md:text-[12px] font-medium tracking-[0.1em] uppercase mb-4 md:mb-6"
          style={{ color: "rgba(245,245,240,0.45)" }}
        >
          Маршруты, которые меняют угол зрения
        </p>
        <h1
          className="font-black leading-[0.93] tracking-[-0.03em] text-paper"
          style={{ fontSize: "clamp(52px, 14vw, 140px)" }}
        >
          Лети туда,<br />где не был
        </h1>
      </div>

      {/* Mobile search */}
      <div className="relative z-[3] px-5 pb-9 md:hidden">
        <div className="flex flex-col gap-[2px]">
          <div className="grid grid-cols-2 gap-[2px]">
            <MobileSearchField id="from-m" label="Откуда" placeholder="Москва" />
            <MobileSearchField id="to-m" label="Куда" placeholder="Куда угодно" />
          </div>
          <MobileSearchField id="date-m" label="Когда" type="date" />
          <button
            type="button"
            className="bg-paper text-ink text-[11px] font-extrabold tracking-[0.1em] uppercase p-[18px] flex items-center justify-center gap-[10px]"
          >
            <span>✈</span> Найти рейс
          </button>
        </div>
      </div>

      {/* Desktop search bar */}
      <div className="hidden md:block relative z-[3]" style={{ padding: "0 60px 80px" }}>
        <form
          className="flex max-w-[820px]"
          style={{
            border: "1px solid rgba(245,245,240,0.14)",
            backgroundColor: "rgba(13,13,13,0.7)",
            backdropFilter: "blur(16px)",
          }}
        >
          <SearchField id="from" label="Откуда" placeholder="Москва" />
          <SearchField id="to" label="Куда" placeholder="Куда угодно" />
          <SearchField id="date" label="Когда" type="date" noBorder />
          <button
            type="submit"
            className="bg-paper text-ink text-[11px] font-bold tracking-[0.1em] uppercase px-8 whitespace-nowrap cursor-pointer hover:bg-paper-soft transition-colors duration-200"
            style={{ minHeight: "68px" }}
          >
            ✈&nbsp; Найти рейс
          </button>
        </form>
      </div>
    </section>
  );
}
