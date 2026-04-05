'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes, FetchNotesResponse } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import { Note } from '@/types/note';

export default function NotesClient() {
  const params = useParams();
  const slug = params.slug;
  const category = Array.isArray(slug) ? slug[0] : slug;

  const { data, isLoading } = useQuery<FetchNotesResponse>({
    queryKey: ['notes'],
    queryFn: () => fetchNotes({ page: 1, perPage: 10 }),
  });

  // 1. Отримуємо масив нотаток БЕЗ використання 'any'
  // Використовуємо опціональний ланцюжок ?. для безпечного доступу
  const notes: Note[] = data?.notes || [];

  // 2. Фільтруємо замітки за тегом
  const filteredNotes =
    category === 'all'
      ? notes
      : notes.filter((note: Note) => note.tag === category);

  if (isLoading) return <div>Завантаження нотаток...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>
        {category === 'all' ? 'Всі замітки' : `Категорія: ${category}`}
      </h2>

      {filteredNotes.length > 0 ? (
        <NoteList notes={filteredNotes} />
      ) : (
        <p>У цій категорії поки немає заміток.</p>
      )}
    </div>
  );
}
