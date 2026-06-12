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
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-ink"
    >
      {/* Background photo — floats right, fades to left via mask */}
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
          WebkitMaskImage:
            "linear-gradient(to left, black 55%, transparent 100%)",
          maskImage:
            "linear-gradient(to left, black 55%, transparent 100%)",
        }}
      />

      {/* Static SVG route path (animation wired in task 4) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="none"
          stroke="rgba(245,245,240,0.35)"
          strokeWidth="1.5"
          strokeDasharray="8 6"
          d="M -60,820 C 120,700 260,480 520,360 C 720,270 960,240 1200,200 C 1340,180 1420,160 1500,140"
        />
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
