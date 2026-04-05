'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal'; // Используем общий компонент!

export default function NotePreviewClient({ id }: { id: string }) {
  const router = useRouter();

  const { data: note } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false, // Это требование ментора
  });

  if (!note) return null;

  return (
    <Modal onClose={() => router.back()}>
      <div>
        <h2>{note.title}</h2>
        <p>
          <strong>Tag:</strong> {note.tag}
        </p>
        <div>{note.content}</div>
      </div>
    </Modal>
  );
}
