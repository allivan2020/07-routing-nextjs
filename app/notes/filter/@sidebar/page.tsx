import Link from 'next/link';
import css from './Sidebar.module.css';

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
    </ul>
  );
}
