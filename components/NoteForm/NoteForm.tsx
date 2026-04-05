'use client';

import React from 'react';
import css from './NoteForm.module.css';

// Вот эта часть говорит Тайпскрипту, что проп onClose существует!
interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  return (
    <form
      className={css.form}
      onSubmit={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <h3 className={css.title}>Add New Note</h3>
      <input type="text" placeholder="Title" className={css.input} />
      <textarea placeholder="Content" className={css.textarea} />

      <div className={css.actions}>
        <button type="button" onClick={onClose} className={css.cancelBtn}>
          Cancel
        </button>
        <button type="submit" className={css.submitBtn}>
          Save
        </button>
      </div>
    </form>
  );
}
