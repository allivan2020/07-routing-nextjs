'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';

interface NotePreviewClientProps {
  noteId: string;
}

export default function NotePreviewClient({ noteId }: NotePreviewClientProps) {
  const { data: note } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (!note) return null;

  return (
    <div style={{ padding: '40px' }}>
      <h2>{note.title}</h2>
      <p>#{note.tag}</p>
      <div>{note.content}</div>
    </div>
  );
}
