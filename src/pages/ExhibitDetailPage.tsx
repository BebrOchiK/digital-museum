import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { type Exhibit, INITIAL_EXHIBITS } from '../data/exhibits';

const EXHIBITS_STORAGE_KEY = 'digital_museum_exhibits_v1';

export const ExhibitDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const saved = localStorage.getItem(EXHIBITS_STORAGE_KEY);
  const exhibits: Exhibit[] = saved ? JSON.parse(saved) : INITIAL_EXHIBITS;
  const exhibit = exhibits.find((item) => item.id === id);

  if (!exhibit) {
    return (
      <div>
        <p>Експонат не знайдено.</p>
        <Link to="/">Назад до каталогу</Link>
      </div>
    );
  }

  return (
    <div className='border rounded-md'>
      <Link to="/">← Назад до експонатів</Link>
      <h1>{exhibit.title}</h1>
      <p><strong>Автор:</strong> {exhibit.author}</p>
      <p><strong>Рік:</strong> {exhibit.year}</p>
      <p><strong>Зал:</strong> {exhibit.hall}</p>
      <p>{exhibit.description}</p>
    </div>
  );
};