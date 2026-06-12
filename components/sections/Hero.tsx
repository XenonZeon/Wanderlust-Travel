"use client";

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

export default function Hero() {
  const pathRef     = useRef<SVGPathElement>(null);
  const planeRef    = useRef<SVGTextElement>(null);
  const clipRectRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const path     = pathRef.current;
    const plane    = planeRef.current;
    const clipRect = clipRectRef.current;
    if (!path || !plane || !clipRect) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      clipRect.setAttribute("width", "1700");
      return;
    }

    const len = path.getTotalLength();
    const DURATION  = 2800;
    const ROUTE_DELAY = 300;  // matches HTML's 0.3s
    const PLANE_DELAY = 400;  // matches HTML's setTimeout 400

    let startTime: number | null = null;
    let raf: number;

    // ease-in-out (same as HTML mockup formula)
    const ease = (t: number) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const tick = (ts: number) => {
      if (startTime === null) startTime = ts;
      const elapsed = ts - startTime;

      // Route reveal: clipPath rect expands left→right, path always stays dashed
      if (elapsed >= ROUTE_DELAY) {
        const t = Math.min((elapsed - ROUTE_DELAY) / DURATION, 1);
        clipRect.setAttribute("width", String(ease(t) * 1700));
      }

      // Plane follows route with 100ms extra delay
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
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-ink"
    >
      {/* Background photo */}
      <div
        className="absolute"
        style={{
          right: "-60px",
          top: "-30px",
          width: "68%",
          height: "110%",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          WebkitMaskImage: "linear-gradient(to left, black 55%, transparent 100%)",
          maskImage: "linear-gradient(to left, black 55%, transparent 100%)",
        }}
      />

      {/* SVG route + animated plane */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          {/* Clip rect starts at width=0, expands right to reveal the dashed path */}
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
      <div
        className="relative z-[3] mb-[60px] max-w-[660px]"
        style={{ padding: "0 60px" }}
      >
        <p
          className="text-[12px] font-medium tracking-[0.1em] uppercase mb-6"
          style={{ color: "rgba(245,245,240,0.45)" }}
        >
          Маршруты, которые меняют угол зрения
        </p>
        <h1
          className="font-black leading-[0.95] tracking-[-0.03em] text-paper"
          style={{ fontSize: "clamp(80px, 9vw, 140px)" }}
        >
          Лети туда,<br />где не был
        </h1>
      </div>

      {/* Search bar */}
      <div className="relative z-[3]" style={{ padding: "0 60px 80px" }}>
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
