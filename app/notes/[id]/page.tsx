import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
// ИМПОРТИРУЕМ НОВОЕ ИМЯ
import NoteDetailsClient from './NoteDetails.client';

export default async function NoteModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* ИСПОЛЬЗУЕМ НОВОЕ ИМЯ */}
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}
