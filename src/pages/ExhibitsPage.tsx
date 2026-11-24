import { useEffect, useState } from "react";
import { INITIAL_EXHIBITS, type Exhibit } from "../data/exhibits";
import { Link } from "react-router-dom";

const EXHIBITS_STORAGE_KEY = 'digital_museum_exhibits_v1';

export function ExhibitsPage() {
    const [exhibits, setExhibits] = useState<Exhibit[]>(() => {
        const data = localStorage.getItem(EXHIBITS_STORAGE_KEY);
        if (!data) return INITIAL_EXHIBITS;
        try{
            return JSON.parse(data);
        }
        catch {
            return INITIAL_EXHIBITS;
        }
    });

    const [search, setSearch] = useState('');
    const [hallFilter, setHallFilter] = useState<string>('Усі');

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [year, setYear] = useState('2000');
    const [hall, setHall] = useState<Exhibit['hall']>('Живопис');
    const [description, setDescription] = useState('');

    useEffect(() => {
        localStorage.setItem(EXHIBITS_STORAGE_KEY, JSON.stringify(exhibits));
    }, [exhibits]);

    const filteredExhibits = exhibits.filter((item) => {
    const matchesHall = hallFilter === 'Усі' || item.hall === hallFilter;
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.author.toLowerCase().includes(q);
    return matchesHall && matchesSearch;
  });

  const handleAddExhibit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    const newExhibit: Exhibit = {
      id: String(Date.now()),
      title: title.trim(),
      author: author.trim(),
      year: Number(year) || 2000,
      hall,
      description: description.trim() || 'Опис експоната відсутній.',
    };

    setExhibits((prev) => [newExhibit, ...prev]);
    setTitle('');
    setAuthor('');
    setYear('2000');
    setDescription('');
  };

  return (
    <div className='border rounded-md'>
      <h1>DIGITAL MUSEUM — Експонати</h1>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Пошук за назвою або автором..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={hallFilter} onChange={(e) => setHallFilter(e.target.value)}>
          <option value="Усі">Усі зали</option>
          <option value="Живопис">Живопис</option>
          <option value="Скульптура">Скульптура</option>
          <option value="Технології">Технології</option>
        </select>
      </div>

      <ul>
        {filteredExhibits.map((item) => (
          <li key={item.id} style={{ marginBottom: '10px' }}>
            <Link to={`/exhibit/${item.id}`}>
              <strong>{item.title}</strong>
            </Link>{' '}
            — {item.author} ({item.year}) [{item.hall}]
          </li>
        ))}
        {filteredExhibits.length === 0 && <p>Нічого не знайдено.</p>}
      </ul>

      <hr style={{ margin: '24px 0' }} />

      <h2>Додати експонат</h2>
      <form onSubmit={handleAddExhibit} style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '420px' }}>
        <input
          type="text"
          placeholder="Назва експоната"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Автор"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Рік"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <select value={hall} onChange={(e) => setHall(e.target.value as Exhibit['hall'])}>
          <option value="Живопис">Живопис</option>
          <option value="Скульптура">Скульптура</option>
          <option value="Технології">Технології</option>
        </select>
        <textarea
          placeholder="Короткий опис"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
        <button type="submit">Додати до колекції</button>
      </form>
    </div>
  );
}