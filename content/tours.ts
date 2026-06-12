export interface Tour {
  id: string;
  from: string;
  to: string;
  destination: string;
  description?: string;
  nights: number;
  price: number;
  image: string;
}

export const tours: Tour[] = [
  {
    id: 'tokyo',
    from: 'SVO',
    to: 'NRT',
    destination: 'Токио',
    description: 'Японские мегаполисы и горные маршруты',
    nights: 12,
    price: 189000,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=900&q=80',
  },
  {
    id: 'reykjavik',
    from: 'SVO',
    to: 'KEF',
    destination: 'Рейкьявик',
    description: 'Северное сияние и чёрные пляжи',
    nights: 8,
    price: 142000,
    image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=900&q=80',
  },
  {
    id: 'marrakech',
    from: 'SVO',
    to: 'CMN',
    destination: 'Марракеш',
    nights: 7,
    price: 98000,
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=700&q=80',
  },
  {
    id: 'patagonia',
    from: 'SVO',
    to: 'SCL',
    destination: 'Патагония',
    nights: 14,
    price: 260000,
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=700&q=80',
  },
  {
    id: 'tbilisi',
    from: 'SVO',
    to: 'TBS',
    destination: 'Тбилиси',
    description: 'Вино, горы, старый город',
    nights: 6,
    price: 64000,
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=900&q=80',
  },
];
