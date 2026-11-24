import React, { useEffect, useState } from 'react';
import type { GuestNote } from '../data/exhibits';

const GUESTBOOK_STORAGE_KEY = 'digital_museum_guestbook_v1';

export const GuestbookPage: React.FC = () => {
  const [notes, setNotes] = useState<GuestNote[]>(() => {
    const saved = localStorage.getItem(GUESTBOOK_STORAGE_KEY);
    if (!saved) return [];
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  });

  const [visitor, setVisitor] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    localStorage.setItem(GUESTBOOK_STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitor.trim() || !comment.trim()) return;

    const newNote: GuestNote = {
      id: String(Date.now()),
      visitor: visitor.trim(),
      comment: comment.trim(),
      createdAt: new Date().toLocaleDateString('uk-UA'),
    };

    setNotes((prev) => [newNote, ...prev]);
    setVisitor('');
    setComment('');
  };

  return (
    <div className='border rounded-md'>
      <h1>Книга відвідувачів</h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '420px', marginBottom: '24px' }}>
        <input
          type="text"
          placeholder="Ваше ім'я"
          value={visitor}
          onChange={(e) => setVisitor(e.target.value)}
          required
        />
        <textarea
          placeholder="Враження від музею..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          required
        />
        <button type="submit">Залишити запис</button>
      </form>

      {notes.length === 0 ? (
        <p>Записів поки немає.</p>
      ) : (
        <ul>
          {notes.map((n) => (
            <li key={n.id} style={{ marginBottom: '12px' }}>
              <strong>{n.visitor}</strong> ({n.createdAt}): {n.comment}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};