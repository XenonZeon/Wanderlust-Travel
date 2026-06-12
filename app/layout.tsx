import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Wanderlust Travel — авторские туры по всему миру",
  description:
    "Маршруты в Токио, Рейкьявик, Марракеш, Патагонию и Тбилиси. Оставьте заявку — менеджер свяжется в течение 2 часов.",
  openGraph: {
    title: "Wanderlust Travel — авторские туры по всему миру",
    description:
      "Маршруты в Токио, Рейкьявик, Марракеш, Патагонию и Тбилиси. Оставьте заявку — менеджер свяжется в течение 2 часов.",
    siteName: "Wanderlust Travel",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Wanderlust Travel — авторские туры",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wanderlust Travel — авторские туры по всему миру",
    description:
      "Маршруты в Токио, Рейкьявик, Марракеш, Патагонию и Тбилиси.",
    images: [
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80",
    ],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={inter.variable}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
