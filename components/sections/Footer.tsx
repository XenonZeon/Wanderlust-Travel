export default function Footer() {
  return (
    <footer id="footer" className="bg-ink-soft px-5 md:px-[60px] pt-10 md:pt-[60px] pb-8 md:pb-[40px]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-8 md:pb-[48px] border-b border-paper/[0.08]">
        <span className="text-[11px] md:text-[12px] font-extrabold tracking-[0.14em] uppercase text-paper mb-8 md:mb-0">
          Wanderlust Travel
        </span>
        <nav className="flex flex-col md:flex-row gap-4 md:gap-9">
          <a href="#tours"   className="text-[10px] md:text-[11px] font-medium tracking-[0.08em] uppercase text-paper/[0.32] hover:text-paper transition-colors">Туры</a>
          <a href="#about"   className="text-[10px] md:text-[11px] font-medium tracking-[0.08em] uppercase text-paper/[0.32] hover:text-paper transition-colors">О нас</a>
          <a href="#reviews" className="text-[10px] md:text-[11px] font-medium tracking-[0.08em] uppercase text-paper/[0.32] hover:text-paper transition-colors">Отзывы</a>
          <a href="#contact" className="text-[10px] md:text-[11px] font-medium tracking-[0.08em] uppercase text-paper/[0.32] hover:text-paper transition-colors">Контакт</a>
        </nav>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:gap-[32px] pt-7 md:pt-[32px] gap-[10px]">
        <span className="text-[10px] md:text-[11px] text-paper/[0.22] md:text-paper/[0.28] md:mr-auto">
          © {new Date().getFullYear()} Wanderlust Travel
        </span>
        {/* tagline: last on mobile, middle on desktop */}
        <span className="text-[10px] italic text-paper/[0.18] md:text-paper/[0.22] order-last md:order-none">
          Каждый маршрут — ваш
        </span>
        <div className="flex flex-col md:flex-row gap-2 md:gap-[24px]">
          <a href="tel:+74951234567"             className="text-[11px] font-medium tracking-[0.04em] text-paper/40 hover:text-paper transition-colors">
            +7 495 123-45-67
          </a>
          <a href="mailto:hello@wanderlust.travel" className="text-[11px] font-medium tracking-[0.04em] text-paper/40 hover:text-paper transition-colors">
            hello@wanderlust.travel
          </a>
        </div>
      </div>
    </footer>
  );
}
