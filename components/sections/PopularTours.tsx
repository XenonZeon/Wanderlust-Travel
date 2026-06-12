import { tours } from '@/content/tours';

function formatPrice(price: number) {
  return `от ${price.toLocaleString('ru-RU')} ₽`;
}

function formatNights(n: number) {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m100 >= 11 && m100 <= 14) return `${n} ночей`;
  if (m10 === 1) return `${n} ночь`;
  if (m10 >= 2 && m10 <= 4) return `${n} ночи`;
  return `${n} ночей`;
}

const CARD_DEFS = [
  { gridColumn: '1',     gridRow: '1 / 3', layout: 'large', photoW: '',    arrows: '→ → → → →' },
  { gridColumn: '2 / 4', gridRow: '1',     layout: 'wide',  photoW: '45%', arrows: '→ → → → →' },
  { gridColumn: '2',     gridRow: '2',     layout: 'small', photoW: '',    arrows: '→ → →'     },
  { gridColumn: '3',     gridRow: '2',     layout: 'small', photoW: '',    arrows: '→ → →'     },
  { gridColumn: '1 / 3', gridRow: '3',     layout: 'wide',  photoW: '44%', arrows: '→ → → → →' },
] as const;

export default function PopularTours() {
  return (
    <section id="tours" className="px-[60px] pt-[140px] pb-[100px] bg-ink">
      <h2
        className="font-black tracking-[-0.03em] leading-[0.95] mb-16 max-w-[500px]"
        style={{ fontSize: 'clamp(52px, 6vw, 88px)' }}
      >
        Популярные<br />направления
      </h2>

      <div
        className="grid gap-[3px]"
        style={{
          gridTemplateColumns: '1.5fr 1fr 1fr',
          gridTemplateRows: '340px 280px 320px',
        }}
      >
        {tours.slice(0, 5).map((tour, i) => {
          const { gridColumn, gridRow, layout, photoW, arrows } = CARD_DEFS[i];
          const isWide  = layout === 'wide';
          const isLarge = layout === 'large';
          const isSmall = layout === 'small';

          return (
            <article
              key={tour.id}
              className={`overflow-hidden bg-ink-soft flex ${isWide ? 'flex-row' : 'flex-col'}`}
              style={{ gridColumn, gridRow }}
            >
              {/* Photo */}
              <div
                className={`bg-cover bg-center bg-no-repeat shrink-0 ${
                  isLarge ? 'flex-1 min-h-0' :
                  isWide  ? 'h-full'          :
                            'h-[46%]'
                }`}
                style={{
                  backgroundImage: `url('${tour.image}')`,
                  ...(isWide ? { width: photoW } : {}),
                }}
              />

              {/* Info */}
              <div
                className={`flex flex-col ${isWide ? 'flex-1' : isSmall ? 'flex-1' : 'shrink-0'} ${
                  isSmall ? 'pt-3 px-[18px] pb-[14px] gap-[6px]' : 'pt-[18px] px-[22px] pb-5 gap-2'
                }`}
                style={{
                  borderTop:  isWide ? 'none' : '1px dashed rgba(245,245,240,0.12)',
                  borderLeft: isWide ? '1px dashed rgba(245,245,240,0.12)' : 'none',
                }}
              >
                {/* Route */}
                <div className="flex items-center gap-[6px]">
                  <span
                    className="text-[11px] font-extrabold tracking-[0.06em]"
                    style={{ color: 'rgba(245,245,240,1)' }}
                  >
                    {tour.from}
                  </span>
                  <span
                    className="text-[10px] tracking-[2px]"
                    style={{ color: 'rgba(245,245,240,0.28)' }}
                  >
                    {arrows}
                  </span>
                  <span
                    className="text-[11px] font-extrabold tracking-[0.06em]"
                    style={{ color: 'rgba(245,245,240,1)' }}
                  >
                    {tour.to}
                  </span>
                </div>

                {/* Destination */}
                <h3
                  className="font-extrabold tracking-[-0.02em] leading-none"
                  style={{ fontSize: isLarge ? '32px' : '26px' }}
                >
                  {tour.destination}
                </h3>

                {/* Description */}
                {tour.description && (
                  <p
                    className="text-[12px] leading-[1.5]"
                    style={{ color: 'rgba(245,245,240,0.45)' }}
                  >
                    {tour.description}
                  </p>
                )}

                {/* Meta */}
                <div className="flex items-baseline gap-4 mt-auto">
                  <span
                    className="text-[10px] font-semibold tracking-[0.08em] uppercase"
                    style={{ color: 'rgba(245,245,240,0.35)' }}
                  >
                    {formatNights(tour.nights)}
                  </span>
                  <span
                    className="font-black tracking-[-0.02em]"
                    style={{ fontSize: isLarge ? '28px' : '22px' }}
                  >
                    {formatPrice(tour.price)}
                  </span>
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 mt-1 text-[10px] font-bold tracking-[0.1em] uppercase px-[18px] py-[10px] w-fit"
                  style={{ border: '1px solid rgba(245,245,240,0.2)', color: 'rgba(245,245,240,1)' }}
                >
                  ✈ Выбрать тур
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
