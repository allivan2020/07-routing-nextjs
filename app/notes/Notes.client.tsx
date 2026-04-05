'use client';

import { useState } from 'react';
import {
  useQuery,
  useQueryClient, // Добавили для обновления списка
  keepPreviousData,
} from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Modal from '@/components/Modal/Modal'; // Добавь импорт
import NoteForm from '@/components/NoteForm/NoteForm'; // Добавь импорт
import css from './Notes.module.css';

export default function NotesClient({ tag }: { tag?: string }) {
  // 1. Память для страницы, поиска и модалки
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // <--- ЭТОГО НЕ ХВАТАЛО

  const queryClient = useQueryClient(); // <--- И ЭТОГО

  // 2. Логика запроса (Ключ теперь следит и за ТЕГОМ)
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes', page, searchQuery, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 10,
        search: searchQuery,
        tag: tag,
      }),
    placeholderData: keepPreviousData,
  });

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setPage(1);
  }, 500);

  if (isLoading) return <p>Загрузка заметок...</p>;
  if (isError) return <p>Ошибка при загрузке.</p>;

  return (
    <div className={css.container}>
      <header
        className={css.toolbar}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <SearchBox onChange={handleSearch} />

        <button
          className={css.button}
          onClick={() => setIsModalOpen(true)} // Теперь это сработает!
          style={{
            padding: '10px 20px',
            backgroundColor: '#000',
            color: '#fff',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Create note +
        </button>
      </header>

      {/* Список заметок */}
      {isSuccess && data?.notes && <NoteList notes={data.notes} />}

      {/* Пагинация */}
      {isSuccess && data && data.totalPages > 1 && (
        <Pagination
          totalPages={data.totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}

      {/* 3. САМО МОДАЛЬНОЕ ОКНО (Добавляем в самый низ) */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onCancel={() => setIsModalOpen(false)}
            onSuccess={() => {
              setIsModalOpen(false);
              // Говорим React Query: "Данные устарели, перекачай список!"
              queryClient.invalidateQueries({ queryKey: ['notes'] });
            }}
          />
        </Modal>
      )}
    </div>
  );
}
