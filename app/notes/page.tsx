// import {
//   dehydrate,
//   HydrationBoundary,
//   QueryClient,
// } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
// import NotesClient from './Notes.client';
// import { fetchNotes } from '@/lib/api';

export default function NotesPage() {
  // Как только юзер заходит на /notes, мы его мгновенно кидаем туда, где есть сайдбар
  redirect('/notes/filter/all');
}
