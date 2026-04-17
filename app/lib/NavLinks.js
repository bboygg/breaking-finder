'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styles from '../styles.module.css';

export default function NavLinks() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'en';

  return (
    <div className={styles.navLeft}>
      <Link href={`/?lang=${lang}`} className={styles.navLink} style={{ color: '#000', fontSize: '1.1rem', fontWeight: '800' }}>
        Breaking Finder
      </Link>
      <Link href={`/events?lang=${lang}`} className={styles.navLink} style={{ marginLeft: '2rem' }}>
        Events
      </Link>
    </div>
  );
}
