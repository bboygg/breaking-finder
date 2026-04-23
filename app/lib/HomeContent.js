'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styles from '../styles.module.css';

export default function HomeContent({ initialEvents }) {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'en';

  const upcomingEvents = [...initialEvents]
    .filter(e => new Date(e.startDate) >= new Date())
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    .slice(0, 3);

  const highlightedEvents = upcomingEvents.length > 0 
    ? upcomingEvents 
    : [...initialEvents].sort((a, b) => new Date(b.startDate) - new Date(a.startDate)).slice(0, 3);

  const t = {
    ko: {
      title: 'Breaking Finder',
      description: '브레이킹 배틀 검색 쉽고 빠르게',
      explore: '행사 탐색하기',
      highlighted: '주요 행사',
    },
    en: {
      title: 'Breaking Finder',
      description: 'Discover Breaking Battles Quickly and Easily',
      explore: 'Explore Events',
      highlighted: 'HIGHLIGHTED EVENTS',
    }
  }[lang];

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <h1 className={styles.title}>{t.title}</h1>
        <p className={styles.description}>{t.description}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <Link href={`/events?lang=${lang}`} className={styles.button} style={{ padding: '1rem 3rem', fontSize: '1.1rem', background: '#000', color: '#fff', textDecoration: 'none', borderRadius: '12px', fontWeight: '800' }}>
            {t.explore}
          </Link>
        </div>
      </div>
      
      <section className={styles.highlightSection}>
        <h2 className={styles.highlightHeading}>{t.highlighted}</h2>
        <div className={styles.highlightList}>
          {highlightedEvents.map(event => (
            <Link 
              key={event.id} 
              href={`/events/${event.id}?lang=${lang}`} 
              className={styles.highlightCard}
            >
              <div className={styles.cardMain}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span className={`${styles.badge} ${styles['type-badge']}`} style={{ fontWeight: '800' }}>{event.category}</span>
                  <span className={`${styles.badge} ${styles['status-' + event.status.toLowerCase()]}`} style={{ fontSize: '0.65rem' }}>{event.status}</span>
                </div>
                <h3 className={styles.cardTitle}>{event.name[lang] || event.name.en}</h3>
                <div className={styles.cardMeta} style={{ fontSize: '1rem' }}>
                  <span>📍 {event.location.city[lang]}, {event.location.country[lang]}</span>
                  <span>🏢 {event.location.venue[lang]}</span>
                </div>
                <div className={styles.cardBadgeGroup} style={{ marginTop: '1rem' }}>
                  {event.formats.map(format => (
                    <span key={format} className={`${styles.badge} ${styles['badge-format']}`} style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
                      {format}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className={styles.cardSide}>
                <span className={styles.cardDate}>
                  {event.startDate}
                  {event.isMultiDay && <span style={{ display: 'block', fontSize: '0.8rem', color: '#999' }}>~ {event.endDate}</span>}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
