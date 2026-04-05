import Link from 'next/link';
import css from './SidebarNotes.module.css';

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href="/notes/filter/all" className={css.menuLink}>
          All notes
        </Link>
      </li>
      <li className={css.menuItem}>
        <Link href="/notes/filter/Work" className={css.menuLink}>
          Work
        </Link>
      </li>
      {/* Можешь добавить еще теги, если они есть в базе */}
    </ul>
  );
}
