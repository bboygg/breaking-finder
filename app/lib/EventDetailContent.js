'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styles from '../styles.module.css';

export default function EventDetailContent({ event }) {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'en';

  const t = {
    ko: {
      back: '↩ 목록으로 돌아가기',
      visit: '공식 링크 방문하기',
      date: '날짜',
      time: '시간',
      reg_date: '참가 접수',
      location: '도시/국가',
      venue: '장소',
      type: '카테고리',
      format: '포맷',
      status: '진행 상태'
    },
    en: {
      back: '↩ Back to List',
      visit: 'Visit Event Link',
      date: 'Date',
      time: 'Time',
      reg_date: 'Registration',
      location: 'Location',
      venue: 'Venue',
      type: 'Category',
      format: 'Format',
      status: 'Status'
    }
  }[lang];

  return (
    <main className={styles.main}>
      <div className={styles.detailCard}>
        <header className={styles.detailHeader}>
          <h1 className={styles.title} style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
            {event.name[lang] || event.name.en}
          </h1>
        </header>

        <div className={styles.detailBox}>
          <div className={styles.detailItem}>
            <span className={styles.detailItemLabel}>{t.status}</span>
            <div className={styles.detailItemValue}>
              <span className={`${styles.badge} ${styles['status-' + event.status.toLowerCase()]}`}>
                {event.status}
              </span>
            </div>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.detailItemLabel}>{t.type}</span>
            <div className={styles.detailItemValue}>
              <span className={`${styles.badge} ${styles['type-badge']}`} style={{ fontWeight: '800' }}>
                {event.category}
              </span>
            </div>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.detailItemLabel}>{t.date}</span>
            <div className={styles.detailItemValue}>
              {event.startDate}
              {event.isMultiDay && <span> ~ {event.endDate}</span>}
            </div>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.detailItemLabel}>{t.time}</span>
            <div className={styles.detailItemValue}>
              {event.event_time.start.split(' ')[1]} ~ {event.event_time.end.split(' ')[1]}
            </div>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.detailItemLabel}>{t.location}</span>
            <div className={styles.detailItemValue}>
              {event.location.city[lang]}, {event.location.country[lang]}
            </div>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.detailItemLabel}>{t.venue}</span>
            <div className={styles.detailItemValue}>{event.location.venue[lang]}</div>
          </div>

          <div className={styles.detailItem} style={{ gridColumn: 'span 2' }}>
            <span className={styles.detailItemLabel}>{t.format}</span>
            <div className={styles.detailItemValue}>
              {event.formats.map(f => (
                <span key={f} className={`${styles.badge} ${styles['badge-format']}`}>
                  {f}
                </span>
              ))}
            </div>
          </div>
          
          <div className={styles.detailItem} style={{ gridColumn: 'span 2' }}>
            <span className={styles.detailItemLabel}>{t.reg_date}</span>
            <div className={styles.detailItemValue}>{event.registration.start} ~ {event.registration.end}</div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <a href={event.url} target="_blank" rel="noopener noreferrer" className={styles.button} style={{ background: '#000', color: '#fff', padding: '1rem 4rem', borderRadius: '12px', textDecoration: 'none', fontWeight: '700', display: 'inline-block' }}>
            {t.visit}
          </a>
        </div>
      </div>

      <div className={styles.backLink} style={{ textAlign: 'center' }}>
        <Link href={`/events?lang=${lang}`} className={styles.backButton} style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>
          {t.back}
        </Link>
      </div>
    </main>
  );
}
