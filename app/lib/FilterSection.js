'use client';

import { useState } from 'react';
import styles from '../styles.module.css';

export default function FilterSection({ title, children, defaultExpanded = true }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className={styles.filterSection}>
      <button 
        className={styles.filterHeaderButton} 
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span className={styles.filterHeading}>{title}</span>
        <span className={styles.expandIcon}>{isExpanded ? '−' : '+'}</span>
      </button>
      
      {isExpanded && (
        <div className={styles.filterContent}>
          {children}
        </div>
      )}
    </div>
  );
}
