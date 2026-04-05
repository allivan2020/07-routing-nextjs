import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';
import { fetchNoteById } from '@/lib/api';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params; // Правильно для Next.js 15

  const queryClient = new QueryClient();

  // Попереднє завантаження даних на сервері
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* Передаємо id як пропс, якщо не хочемо юзати useParams всередині */}
      <NoteDetailsClient noteId={id} />
    </HydrationBoundary>
  );
}
