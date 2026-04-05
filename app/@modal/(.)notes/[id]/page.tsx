'use client';

import { use } from 'react'; // Специальный инструмент для "распаковки"
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';

export default function NoteModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();

  // 1. РАСПАКОВКА: Открываем конверт с данными
  // Без этой строчки Next.js будет ругаться в консоль бесконечно
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <div
        style={{
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          color: '#000',
        }}
      >
        <h2>Детали заметки №{id}</h2>
        <hr style={{ margin: '15px 0' }} />
        <p>
          Вы просматриваете содержимое заметки с идентификатором:{' '}
          <strong>{id}</strong>
        </p>

        <button
          onClick={handleClose}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            cursor: 'pointer',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Вернуться к списку
        </button>
      </div>
    </Modal>
  );
}
