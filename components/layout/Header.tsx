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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[200] flex items-center transition-all duration-[400ms]"
      style={{
        padding: "28px 60px",
        backgroundColor: scrolled ? "rgba(13,13,13,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
      }}
    >
      <nav className="flex items-center w-full">
        <a
          href="#"
          className="text-[12px] font-extrabold tracking-[0.14em] uppercase mr-auto text-paper"
        >
          Wanderlust Travel
        </a>

        <ul className="flex gap-9 mr-8">
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

        <a
          href="#contact"
          className="text-[10px] font-bold tracking-[0.12em] uppercase border border-paper/25 px-[22px] py-[10px] text-paper transition-colors duration-200 hover:bg-paper hover:text-ink"
        >
          Забронировать
        </a>
      </nav>
    </header>
  );
}
