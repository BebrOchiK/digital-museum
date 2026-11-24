export interface Exhibit {
  id: string;
  title: string;
  author: string;
  year: number;
  hall: 'Живопис' | 'Скульптура' | 'Технології';
  description: string;
}

export interface GuestNote {
  id: string;
  visitor: string;
  comment: string;
  createdAt: string;
}

export const INITIAL_EXHIBITS: Exhibit[] = [
  {
    id: '1',
    title: 'Зоряна ніч над рікою',
    author: 'М. Коваленко',
    year: 1924,
    hall: 'Живопис',
    description: 'Полотно з контрастними мазками та нічним відбиттям світла на воді.',
  },
  {
    id: '2',
    title: 'Форма рівноваги',
    author: 'О. Ткачук',
    year: 1978,
    hall: 'Скульптура',
    description: 'Лаконічна композиція з полірованого металу та каменю.',
  },
  {
    id: '3',
    title: 'Перший релейний калькулятор',
    author: 'Інженерна група №4',
    year: 1956,
    hall: 'Технології',
    description: 'Ранній обчислювальний пристрій, що демонструє логіку перемикачів.',
  },
  {
    id: '4',
    title: 'Ранковий туман у горах',
    author: 'І. Савчук',
    year: 1939,
    hall: 'Живопис',
    description: 'Пейзаж у приглушеній гамі з акцентом на глибину простору.',
  },
];