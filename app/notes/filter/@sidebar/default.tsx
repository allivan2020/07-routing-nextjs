import Link from 'next/link';
import css from './Sidebar.module.css';

const TAGS = ['all', 'Work', 'Todo', 'Personal', 'Meeting', 'Shopping'];

export default function Sidebar() {
  return (
    <ul className={css.menuList}>
      {TAGS.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag === 'all' ? 'All notes' : tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
