"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name:        fd.get("name") as string,
      phone:       fd.get("phone") as string,
      destination: fd.get("destination") as string,
      message:     fd.get("message") as string,
      _honey:      fd.get("_honey") as string,
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="bg-paper text-ink px-[60px] py-[120px]">
      <div className="grid grid-cols-[1fr_1.6fr] gap-[80px] items-start">

        {/* Heading */}
        <div>
          <h2 className="text-[clamp(52px,6vw,88px)] font-black tracking-[-0.03em] leading-[0.95] mb-6">
            Куда<br />летим?
          </h2>
          <p className="text-[14px] text-ink/55 leading-[1.65] max-w-[280px]">
            Опишите, что хотите — мы подберём маршрут и свяжемся в течение 2 часов.
          </p>
        </div>

        {/* Form */}
        {status === "success" ? (
          <div className="flex flex-col justify-center gap-4 py-[60px]">
            <p className="text-[28px] font-black tracking-[-0.02em] leading-none">Заявка отправлена ✈</p>
            <p className="text-[14px] text-ink/55 leading-[1.65]">
              Менеджер свяжется с вами в течение 2 часов.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="self-start text-[11px] font-bold tracking-[0.1em] uppercase mt-2 underline underline-offset-4 text-ink/50 hover:text-ink transition-colors"
            >
              Отправить ещё одну
            </button>
          </div>
        ) : (
          <form className="flex flex-col gap-[2px]" onSubmit={handleSubmit} noValidate>
            {/* honeypot */}
            <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="grid grid-cols-2 gap-[2px] items-stretch">
              <div className="flex flex-col bg-paper-soft">
                <label htmlFor="name" className="text-[9px] font-bold tracking-[0.12em] uppercase text-ink/40 px-[18px] pt-[14px]">
                  Имя
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ваше имя"
                  required
                  className="bg-paper-soft text-[14px] font-medium text-ink placeholder:text-ink/28 px-[18px] pb-[16px] pt-[8px] outline-none focus:outline-2 focus:outline-ink/15 focus:-outline-offset-2"
                />
              </div>
              <div className="flex flex-col bg-paper-soft">
                <label htmlFor="phone" className="text-[9px] font-bold tracking-[0.12em] uppercase text-ink/40 px-[18px] pt-[14px]">
                  Телефон
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+7 000 000 00 00"
                  required
                  className="bg-paper-soft text-[14px] font-medium text-ink placeholder:text-ink/28 px-[18px] pb-[16px] pt-[8px] outline-none focus:outline-2 focus:outline-ink/15 focus:-outline-offset-2"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="destination" className="text-[9px] font-bold tracking-[0.12em] uppercase text-ink/40 px-[18px] pt-[14px] bg-paper-soft">
                Направление
              </label>
              <input
                type="text"
                id="destination"
                name="destination"
                placeholder="Куда хотите полететь?"
                className="bg-paper-soft text-[14px] font-medium text-ink placeholder:text-ink/28 px-[18px] pb-[16px] pt-[8px] outline-none focus:outline-2 focus:outline-ink/15 focus:-outline-offset-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-[2px] items-stretch">
              <div className="flex flex-col bg-paper-soft">
                <label htmlFor="travel-date" className="text-[9px] font-bold tracking-[0.12em] uppercase text-ink/40 px-[18px] pt-[14px]">
                  Дата вылета
                </label>
                <input
                  type="date"
                  id="travel-date"
                  name="travel_date"
                  className="bg-paper-soft text-[14px] font-medium text-ink px-[18px] pb-[16px] pt-[8px] outline-none focus:outline-2 focus:outline-ink/15 focus:-outline-offset-2 [&::-webkit-calendar-picker-indicator]:[filter:brightness(0)_opacity(0.7)] [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                />
              </div>
              <div className="flex flex-col bg-paper-soft">
                <label htmlFor="travelers" className="text-[9px] font-bold tracking-[0.12em] uppercase text-ink/40 px-[18px] pt-[14px]">
                  Количество человек
                </label>
                <input
                  type="number"
                  id="travelers"
                  name="travelers"
                  min={1}
                  max={20}
                  placeholder="2"
                  className="bg-paper-soft text-[14px] font-medium text-ink placeholder:text-ink/28 px-[18px] pb-[16px] pt-[8px] outline-none focus:outline-2 focus:outline-ink/15 focus:-outline-offset-2"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="message" className="text-[9px] font-bold tracking-[0.12em] uppercase text-ink/40 px-[18px] pt-[14px] bg-paper-soft">
                Пожелания
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Хочу горы, избегаю пляжных курортов, бюджет — до 200 000 ₽ на двоих..."
                className="bg-paper-soft text-[14px] font-medium text-ink placeholder:text-ink/40 px-[18px] pb-[16px] pt-[8px] outline-none focus:outline-2 focus:outline-ink/15 focus:-outline-offset-2 resize-none"
              />
            </div>

            {status === "error" && (
              <p className="text-[12px] text-red-600 pt-1">
                Не удалось отправить — попробуйте ещё раз или позвоните нам.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="submit-btn self-start flex items-center gap-[10px] bg-ink text-paper text-[11px] font-bold tracking-[0.12em] uppercase px-[36px] py-[22px] mt-1 hover:bg-[#222] transition-colors overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="btn-plane">✈</span>
              {status === "loading" ? "Отправляем..." : "Отправить запрос"}
            </button>
          </form>
        )}

      </div>
    </section>
  );
}
