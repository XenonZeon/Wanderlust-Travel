import { reviews } from '@/content/reviews';

export default function Reviews() {
  return (
    <section id="reviews" className="bg-ink overflow-hidden py-[72px] md:py-[120px]">
      <h2 className="text-[clamp(40px,11vw,88px)] font-black tracking-[-0.03em] leading-[0.95] px-5 md:px-[60px] mb-9 md:mb-[60px] text-paper">
        Говорят<br />пассажиры
      </h2>
      <div className="flex gap-[3px] overflow-x-auto px-5 md:px-[60px] pb-4 md:pb-5 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {reviews.map((review) => (
          <blockquote
            key={review.id}
            className="shrink-0 w-[320px] md:w-[380px] bg-ink-soft p-[28px] md:p-[40px] snap-start flex flex-col justify-between gap-6 md:gap-0"
          >
            <p className="text-[14px] md:text-[16px] leading-[1.65] text-paper italic">
              {review.text}
            </p>
            <footer className="mt-0 md:mt-8 flex flex-col gap-1">
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
