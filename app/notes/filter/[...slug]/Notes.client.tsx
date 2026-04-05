'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes, FetchNotesResponse } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import { Note } from '@/types/note';

// 1. Добавляем описание типов для пропсов
interface NotesClientProps {
  tag?: string;
}

// 2. Принимаем проп tag
export default function NotesClient({ tag }: NotesClientProps) {
  const params = useParams();

  // Если tag передан как проп, используем его, иначе берем из URL
  const slug = params.slug;
  const urlCategory = Array.isArray(slug) ? slug[0] : slug;
  const category = tag || urlCategory;

  const { data, isLoading } = useQuery<FetchNotesResponse>({
    queryKey: ['notes'],
    queryFn: () => fetchNotes({ page: 1, perPage: 10 }),
  });

  const notes: Note[] = data?.notes || [];

  const filteredNotes =
    category === 'all' || !category
      ? notes
      : notes.filter((note: Note) => note.tag === category);

  if (isLoading) return <div>Завантаження нотаток...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>
        {category === 'all' || !category
          ? 'Всі замітки'
          : `Категорія: ${category}`}
      </h2>

      {filteredNotes.length > 0 ? (
        <NoteList notes={filteredNotes} />
      ) : (
        <p>У цій категорії поки немає заміток.</p>
      )}
    </div>
  );
}
