'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';

export default function NotePreviewClient({ noteId }: { noteId: string }) {
  const router = useRouter();

  const { data: note, isLoading } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  // Функція, яка спрацює при закритті модалки
  const handleClose = () => {
    router.back(); // Повертаємося назад до списку нотаток
  };

  if (isLoading) return <div>Завантаження...</div>;

  return (
    <Modal onClose={handleClose}>
      {' '}
      {/* Обов'язково передаємо цей пропс! */}
      <div style={{ padding: '20px' }}>
        <h2>{note?.title}</h2>
        <hr style={{ margin: '10px 0' }} />
        <p>{note?.content}</p>
        {note?.tag && (
          <div style={{ marginTop: '15px', fontSize: '0.8em', color: 'gray' }}>
            Тег: {note.tag}
          </div>
        )}
      </div>
    </Modal>
  );
}
