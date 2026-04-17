'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../styles.module.css';

export default function DateFilter({ lang, t }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleDateChange = (name, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    params.set('page', '1'); // 필터 변경 시 1페이지로 이동
    router.push(`/events?${params.toString()}`);
  };

  return (
    <div className={styles.dateFilterGroup}>
      <div className={styles.dateInputWrapper}>
        <label>{t.from}</label>
        <input 
          type="date" 
          defaultValue={searchParams.get('startDate') || ''} 
          className={styles.dateInput}
          onBlur={(e) => handleDateChange('startDate', e.target.value)}
        />
        <label>{t.to}</label>
        <input 
          type="date" 
          defaultValue={searchParams.get('endDate') || ''} 
          className={styles.dateInput}
          onBlur={(e) => handleDateChange('endDate', e.target.value)}
        />
      </div>
    </div>
  );
}
