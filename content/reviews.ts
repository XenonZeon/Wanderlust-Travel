export interface Review {
  id: string;
  author: string;
  tour: string;
  text: string;
  date: string;
}

// Placeholder content — replace with client data
export const reviews: Review[] = [
  {
    id: "1",
    author: "Анна К.",
    tour: "Мальдивы",
    text: "Незабываемое путешествие. Всё было организовано идеально — от трансфера до отеля.",
    date: "март 2024",
  },
  {
    id: "2",
    author: "Дмитрий В.",
    tour: "Япония",
    text: "Поездка превзошла все ожидания. Маршрут продуман до мелочей, гид — профессионал.",
    date: "апрель 2024",
  },
  {
    id: "3",
    author: "Мария Л.",
    tour: "Бали",
    text: "Обращаюсь уже третий раз. Каждый раз уровень выше. Рекомендую всем.",
    date: "май 2024",
  },
  {
    id: "4",
    author: "Сергей Н.",
    tour: "Италия",
    text: "Неделя в Тоскане — лучший отпуск за последние пять лет. Спасибо за подбор маршрута.",
    date: "июнь 2024",
  },
];
