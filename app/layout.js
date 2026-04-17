import { Suspense } from 'react';
import styles from './styles.module.css'
import './global.css'
import LanguageSelector from './lib/LanguageSelector';
import NavLinks from './lib/NavLinks';

export const metadata = {
  title:  {
    default: 'Breaking Finder',
    template: '%s | Breaking Finder'
    },
  description: 'Find Breaking Battles quick and easy. Discover breaking battles, cyphers, workshops and more.'
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#ffffff'
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <nav className={styles.navBar}>
          <Suspense fallback={<div className={styles.navLeft}>Breaking Finder</div>}>
            <NavLinks />
          </Suspense>
          <div className={styles.navRight}>
            <Suspense fallback={<div className={styles.langGlobeButton}>🌐</div>}>
              <LanguageSelector />
            </Suspense>
          </div>
        </nav>

        {children}
        
        <footer className={styles.footer} style={{ borderTop: '1px solid #eee', padding: '3rem 0', marginTop: '4rem', textAlign: 'center', fontSize: '0.85rem', color: '#999' }}>
          <p>&copy; {new Date().getFullYear()} Breaking Finder. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
