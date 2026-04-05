'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';

interface NoteDetailsClientProps {
  id: string;
}

export default function NoteDetailsClient({ id }: NoteDetailsClientProps) {
  const { data: note } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
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
