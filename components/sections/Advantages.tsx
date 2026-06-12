import { advantages } from '@/content/advantages';

export default function Advantages() {
  return (
    <section id="about" className="bg-ink-soft px-[60px] py-[120px]">
      <div className="flex flex-col">
        {advantages.map((item, i) => (
          <div
            key={item.num}
            className={`flex items-start gap-[60px] py-[52px] border-b border-paper/[0.08]${i === 0 ? ' border-t' : ''}`}
          >
            <span
              className="text-[clamp(72px,8vw,120px)] font-black leading-none tracking-[-0.04em] shrink-0 w-[180px] text-transparent [-webkit-text-stroke:1px_rgba(245,245,240,0.18)]"
            >
              {item.num}
            </span>
            <div className="pt-4 max-w-[580px]">
              <h3 className="text-[28px] font-bold tracking-[-0.02em] mb-[14px] text-paper">
                {item.title}
              </h3>
              <p className="text-[15px] text-paper/[0.48] leading-[1.65]">
                {item.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
