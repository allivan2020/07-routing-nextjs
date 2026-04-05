import React from 'react';
import NotesClient from '@/app/notes/Notes.client';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function FilteredNotesPage({ params }: PageProps) {
  const { slug } = await params;
  const currentTag = slug?.[0];

  // Если в адресе "all", фильтр не применяем (передаем undefined)
  const filterValue = currentTag === 'all' ? undefined : currentTag;

  return (
    <div>
      <h1 style={{ marginBottom: '20px', color: '#333' }}>
        {currentTag === 'all' ? 'Все заметки' : `Категория: ${currentTag}`}
      </h1>
      {/* Передаем пойманный тег в наш основной список */}
      <NotesClient tag={filterValue} />
    </div>
  );
}
