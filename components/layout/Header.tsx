"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { href: "#tours", label: "Туры" },
  { href: "#about", label: "О нас" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#contact", label: "Контакт" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-[350] bg-ink flex flex-col justify-center px-8 transition-opacity duration-[350ms] md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-1">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={closeMenu}
              className="text-[clamp(36px,10vw,52px)] font-black tracking-[-0.03em] leading-[1.1] text-paper/[0.28] hover:text-paper transition-opacity py-2 border-b border-paper/[0.06] last:border-none"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="mt-12 text-[11px] font-medium tracking-[0.06em] text-paper/[0.28]">
          +7 495 123-45-67 · hello@wanderlust.travel
        </div>
      </div>

      <header
        className="fixed top-0 left-0 right-0 z-[400] flex items-center transition-all duration-[400ms] px-5 md:px-[60px]"
        style={{
          height: "60px",
          ...(scrolled || menuOpen
            ? { backgroundColor: "rgba(13,13,13,0.94)", backdropFilter: "blur(12px)" }
            : {}),
        }}
      >
        <a
          href="#"
          className="text-[11px] md:text-[12px] font-extrabold tracking-[0.14em] uppercase mr-auto text-paper"
        >
          Wanderlust Travel
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-9 mr-8">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="text-[11px] font-medium tracking-[0.08em] uppercase text-paper/40 hover:text-paper transition-colors duration-200"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden md:block text-[10px] font-bold tracking-[0.12em] uppercase border border-paper/25 px-[22px] py-[10px] text-paper transition-colors duration-200 hover:bg-paper hover:text-ink"
        >
          Забронировать
        </a>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-[5px]"
          aria-label="Меню"
        >
          <span
            className={`block w-[22px] bg-paper transition-all duration-300 ${
              menuOpen ? "h-[1.5px] translate-y-[6.5px] rotate-45" : "h-[1.5px]"
            }`}
          />
          <span
            className={`block w-[22px] h-[1.5px] bg-paper transition-all duration-300 ${
              menuOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block w-[22px] bg-paper transition-all duration-300 ${
              menuOpen ? "h-[1.5px] -translate-y-[6.5px] -rotate-45" : "h-[1.5px]"
            }`}
          />
        </button>
      </header>
    </>
  );
}
