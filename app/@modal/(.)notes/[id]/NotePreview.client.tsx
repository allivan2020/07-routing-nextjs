'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { Note } from '@/types/note';
import css from './NotePreview.module.css';

export default function NotePreviewClient() {
  const router = useRouter();
  const { id } = useParams();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id as string),
    enabled: !!id,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) return null;
  if (isError || !note) return null;

  return (
    <div className={css.backdrop} onClick={handleClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={handleClose}>
          &times;
        </button>

        <article className={css.content}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.tag}>#{note.tag}</p>
          <div className={css.body}>{note.content}</div>
        </article>
      </div>
    </div>
  );
}
