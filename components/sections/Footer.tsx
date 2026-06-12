export default function Footer() {
  return (
    <footer id="footer" className="bg-ink-soft px-[60px] pt-[60px] pb-[40px]">
      <div className="flex items-center justify-between pb-[48px] border-b border-paper/[0.08]">
        <span className="text-[12px] font-extrabold tracking-[0.14em] uppercase text-paper">
          Wanderlust Travel
        </span>
        <nav className="flex gap-[36px]">
          <a href="#tours" className="text-[11px] font-medium tracking-[0.08em] uppercase text-paper/35 hover:text-paper transition-colors">Туры</a>
          <a href="#about" className="text-[11px] font-medium tracking-[0.08em] uppercase text-paper/35 hover:text-paper transition-colors">О нас</a>
          <a href="#reviews" className="text-[11px] font-medium tracking-[0.08em] uppercase text-paper/35 hover:text-paper transition-colors">Отзывы</a>
          <a href="#contact" className="text-[11px] font-medium tracking-[0.08em] uppercase text-paper/35 hover:text-paper transition-colors">Контакт</a>
        </nav>
      </div>
      <div className="flex items-center gap-[32px] pt-[32px]">
        <span className="text-[11px] text-paper/[0.28] mr-auto">
          © {new Date().getFullYear()} Wanderlust Travel
        </span>
        <span className="text-[11px] italic text-paper/[0.22]">
          Каждый маршрут — ваш
        </span>
        <div className="flex gap-[24px]">
          <a href="tel:+74951234567" className="text-[11px] font-medium tracking-[0.04em] text-paper/45 hover:text-paper transition-colors">
            +7 495 123-45-67
          </a>
          <a href="mailto:hello@wanderlust.travel" className="text-[11px] font-medium tracking-[0.04em] text-paper/45 hover:text-paper transition-colors">
            hello@wanderlust.travel
          </a>
        </div>
      </div>
    </footer>
  );
}
