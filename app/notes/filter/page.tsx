import React from 'react';

// Важно: слово 'export default' должно быть обязательно!
export default function FilterPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#333' }}>Заметки по категориям</h2>
      <p style={{ color: '#666' }}>
        ⬅️ Выберите нужный тег в меню слева, чтобы отфильтровать список.
      </p>
    </div>
  );
}
