'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { useRouter } from 'next/navigation'; // Додаємо імпорт роутера
import Modal from '@/components/Modal/Modal';

export default function NotePreviewClient({ noteId }: { noteId: string }) {
  const router = useRouter(); // Створюємо об'єкт роутера

  const { data: note, isLoading } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  // Функція для закриття модалки
  const handleClose = () => {
    router.back(); // Повертаємо користувача на попередню сторінку
  };

  if (isLoading) return <div>Завантаження...</div>;

  return (
    <Modal onClose={handleClose}>
      {' '}
      {/* Тепер ми передаємо onClose */}
      <div style={{ padding: '20px' }}>
        <h2>{note?.title}</h2>
        <hr />
        <p>{note?.content}</p>
      </div>
    </Modal>
  );
}
