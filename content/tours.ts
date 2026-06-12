export interface Tour {
  id: string;
  destination: string;
  country: string;
  duration: string;
  price: number;
  image: string; // path relative to /public
  featured?: boolean;
}

// Placeholder content — replace with client data
export const tours: Tour[] = [
  {
    id: "maldives",
    destination: "Мальдивы",
    country: "Мальдивы",
    duration: "10 дней",
    price: 180000,
    image: "/images/tours/maldives.jpg",
    featured: true,
  },
  {
    id: "bali",
    destination: "Бали",
    country: "Индонезия",
    duration: "12 дней",
    price: 120000,
    image: "/images/tours/bali.jpg",
  },
  {
    id: "italy",
    destination: "Италия",
    country: "Италия",
    duration: "7 дней",
    price: 95000,
    image: "/images/tours/italy.jpg",
  },
  {
    id: "japan",
    destination: "Япония",
    country: "Япония",
    duration: "14 дней",
    price: 210000,
    image: "/images/tours/japan.jpg",
    featured: true,
  },
];
