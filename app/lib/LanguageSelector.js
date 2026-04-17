'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import styles from '../styles.module.css';

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentLang = searchParams.get('lang') || 'ko';

  const createQueryString = (lang) => {
    const params = new URLSearchParams(searchParams);
    params.set('lang', lang);
    return params.toString();
  };

  const flags = {
    ko: '🇰🇷',
    en: '🇺🇸'
  };

  return (
    <div className={styles.langDropdownContainer}>
      <button 
        className={styles.langGlobeButton} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select Language"
      >
        <span style={{ fontSize: '1rem' }}>{flags[currentLang]}</span>
        <span className={styles.langCodeText}>{currentLang.toUpperCase()}</span>
      </button>

      {isOpen && (
        <>
          <div className={styles.dropdownOverlay} onClick={() => setIsOpen(false)} />
          <div className={styles.langDropdownMenu}>
            <Link 
              href={`${pathname}?${createQueryString('ko')}`}
              className={`${styles.dropdownItem} ${currentLang === 'ko' ? styles.activeLang : ''}`}
              onClick={() => setIsOpen(false)}
            >
              🇰🇷 KO
            </Link>
            <Link 
              href={`${pathname}?${createQueryString('en')}`}
              className={`${styles.dropdownItem} ${currentLang === 'en' ? styles.activeLang : ''}`}
              onClick={() => setIsOpen(false)}
            >
              🇺🇸 EN
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
