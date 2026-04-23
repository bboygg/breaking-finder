'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styles from '../styles.module.css';
import DateFilter from './DateFilter';
import FilterSection from './FilterSection';
import { CATEGORIES, FORMATS } from './constants';

const ITEMS_PER_PAGE = 10;

export default function EventsContent({ eventsData }) {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'en';
  const sort = searchParams.get('sort') || 'desc';
  const category = searchParams.get('category') || '';
  const format = searchParams.get('format') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';
  
  const activeCategories = category ? category.split(',') : [];
  const activeFormats = format ? format.split(',') : [];

  let filteredEvents = [...eventsData];
  if (activeCategories.length > 0) {
    filteredEvents = filteredEvents.filter(e => activeCategories.includes(e.category));
  }
  if (activeFormats.length > 0) {
    filteredEvents = filteredEvents.filter(e => e.formats.some(f => activeFormats.includes(f)));
  }
  if (startDate) filteredEvents = filteredEvents.filter(e => e.startDate >= startDate);
  if (endDate) filteredEvents = filteredEvents.filter(e => e.endDate <= endDate);

  filteredEvents.sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return sort === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const totalEvents = filteredEvents.length;
  const totalPages = Math.ceil(totalEvents / ITEMS_PER_PAGE);
  const currentPage = Math.min(Math.max(1, page), totalPages || 1);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const t = {
    ko: {
      title: '행사',
      filter_cat: '카테고리',
      filter_format: '포맷',
      filter_date: '날짜 범위',
      from: '시작일',
      to: '종료일',
      sort_label: '정렬',
      sort_newest: '최신순',
      sort_oldest: '날짜순',
      results: '개의 행사',
      prev: '이전',
      next: '다음',
      clear: '필터 초기화'
    },
    en: {
      title: 'Events',
      filter_cat: 'CATEGORY',
      filter_format: 'FORMAT',
      filter_date: 'DATE RANGE',
      from: 'From',
      to: 'To',
      sort_label: 'SORT BY',
      sort_newest: 'Newest First',
      sort_oldest: 'Oldest First',
      results: 'events found',
      prev: 'Prev',
      next: 'Next',
      clear: 'Clear Filters'
    }
  }[lang];

  const buildUrl = (newParams) => {
    const current = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([k, v]) => {
      if (v === null || v === '') current.delete(k);
      else current.set(k, v.toString());
    });
    return `/events?${current.toString()}`;
  };

  return (
    <main className={styles.main}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 className={styles.title}>{t.title}</h1>
      </header>

      <div className={styles.contentLayout}>
        <aside className={styles.sidebar}>
          <FilterSection title={t.filter_cat}>
            <div className={styles.checkboxGroup}>
              {CATEGORIES.map(item => {
                const isActive = activeCategories.includes(item);
                const newItems = isActive ? activeCategories.filter(i => i !== item) : [...activeCategories, item];
                return (
                  <Link key={item} href={buildUrl({ category: newItems.join(','), page: 1 })} className={styles.checkboxLabel} scroll={false}>
                    <input type="checkbox" checked={isActive} readOnly className={styles.checkboxInput} />
                    {item}
                  </Link>
                );
              })}
            </div>
          </FilterSection>

          <FilterSection title={t.filter_format}>
            <div className={styles.checkboxGroup}>
              {FORMATS.map(item => {
                const isActive = activeFormats.includes(item);
                const newItems = isActive ? activeFormats.filter(i => i !== item) : [...activeFormats, item];
                return (
                  <Link key={item} href={buildUrl({ format: newItems.join(','), page: 1 })} className={styles.checkboxLabel} scroll={false}>
                    <input type="checkbox" checked={isActive} readOnly className={styles.checkboxInput} />
                    {item}
                  </Link>
                );
              })}
            </div>
          </FilterSection>

          <FilterSection title={t.filter_date}>
             <DateFilter lang={lang} t={t} />
          </FilterSection>

          <FilterSection title={t.sort_label}>
            <div className={styles.sortGroup}>
              <Link href={buildUrl({ sort: 'desc', page: 1 })} className={`${styles.sortLink} ${sort === 'desc' ? styles.activeSort : ''}`} scroll={false}>{t.sort_newest}</Link>
              <Link href={buildUrl({ sort: 'asc', page: 1 })} className={`${styles.sortLink} ${sort === 'asc' ? styles.activeSort : ''}`} scroll={false}>{t.sort_oldest}</Link>
            </div>
          </FilterSection>

          <Link href={`/events?lang=${lang}`} className={styles.clearFilters} scroll={false}>{t.clear}</Link>
        </aside>

        <section>
          <div style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#666', display: 'flex', justifyContent: 'space-between' }}>
            <span><strong>{totalEvents}</strong> {t.results}</span>
            <span>Page {currentPage} of {totalPages}</span>
          </div>
          
          <div className={styles.eventList}>
            {paginatedEvents.map(event => (
              <Link key={event.id} href={`/events/${event.id}?lang=${lang}`} className={styles.eventCard}>
                <div className={styles.cardMain}>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span className={`${styles.badge} ${styles['type-badge']}`} style={{ fontWeight: '800' }}>{event.category}</span>
                    <span className={`${styles.badge} ${styles['status-' + event.status.toLowerCase()]}`} style={{ fontSize: '0.65rem' }}>{event.status}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{event.name[lang] || event.name.en}</h3>
                  <div className={styles.cardMeta}>
                    <span>📍 {event.location.city[lang]}, {event.location.country[lang]}</span>
                    <span>🏢 {event.location.venue[lang]}</span>
                  </div>
                  <div className={styles.cardBadgeGroup}>
                    {event.formats.map(f => (
                      <span key={f} className={`${styles.badge} ${styles['badge-format']}`}>{f}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.cardSide}>
                  <span className={styles.cardDate}>
                    {event.startDate}
                    {event.isMultiDay && <span style={{ display: 'block', fontSize: '0.7rem', color: '#999' }}>~ {event.endDate}</span>}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className={styles.paginationContainer}>
              <Link href={buildUrl({ page: currentPage - 1 })} className={`${styles.pageBtn} ${currentPage === 1 ? styles.disabledBtn : ''}`} scroll={false}>{t.prev}</Link>
              <div className={styles.pageIndicator}>{currentPage} / {totalPages}</div>
              <Link href={buildUrl({ page: currentPage + 1 })} className={`${styles.pageBtn} ${currentPage === totalPages ? styles.disabledBtn : ''}`} scroll={false}>{t.next}</Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
