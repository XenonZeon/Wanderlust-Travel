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
  const pathRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const plane = planeRef.current;
    if (!path || !plane) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      path.style.strokeDasharray = "8 6";
      path.style.strokeDashoffset = "0";
      return;
    }

    const len = path.getTotalLength();

    // Route: precise draw-from-nothing using actual path length, then restore dashes
    path.style.strokeDasharray = String(len);
    path.style.strokeDashoffset = String(len);
    void path.getBoundingClientRect();
    path.style.transition = "stroke-dashoffset 2.8s cubic-bezier(.4,0,.2,1) 0.3s";
    path.style.strokeDashoffset = "0";
    path.addEventListener(
      "transitionend",
      () => {
        path.style.transition = "";
        path.style.strokeDasharray = "8 6";
      },
      { once: true }
    );

    // Plane: RAF-based, ease-in-out matching the HTML mockup, 400ms delay
    const DURATION = 2800;
    let startTime: number | null = null;
    let raf: number;
    let started = false;

    function animatePlane(ts: number) {
      if (!started) return;
      if (startTime === null) startTime = ts;
      const elapsed = ts - startTime;
      const raw = Math.min(elapsed / DURATION, 1);
      const t = raw < 0.5 ? 2 * raw * raw : -1 + (4 - 2 * raw) * raw; // ease-in-out

      const pt  = path!.getPointAtLength(t * len);
      const pt2 = path!.getPointAtLength(Math.min((t + 0.01) * len, len));
      const angle = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * 180 / Math.PI;

      plane!.setAttribute("transform", `translate(${pt.x}, ${pt.y}) rotate(${angle})`);
      plane!.style.opacity = String(
        raw < 0.05 ? raw / 0.05 : raw > 0.88 ? (1 - raw) / 0.12 : 1
      );

      if (raw < 1) raf = requestAnimationFrame(animatePlane);
    }

    // Kick off after 400ms — using RAF timestamp comparison for precision
    const kickoff = requestAnimationFrame(function wait(ts) {
      if (startTime === null) startTime = ts;
      if (ts - startTime < 400) {
        raf = requestAnimationFrame(wait);
        return;
      }
      started = true;
      startTime = null;
      raf = requestAnimationFrame(animatePlane);
    });

    return () => cancelAnimationFrame(raf || kickoff);
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
        <path
          ref={pathRef}
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
