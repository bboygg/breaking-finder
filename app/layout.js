// app/layout.js
import Link from 'next/link';
import styles from './styles.module.css'
import './global.css'

export const metadata = {
  title: {
    default: 'Breaking Finder',
    template: '%s | Breaking Finder'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Navigation Bar */}
        <nav className={styles.navBar}>
          <div className={styles.navLeft}>
            <Link href="/" className={styles.navLink}>
              Breaking Finder
            </Link>
          </div>
          <div className={styles.navLeft}>
            <Link href="/events" className={styles.navLink}>
              Events
            </Link>
          </div>
        </nav>

        <main style={{marginTop: '30px'}}>
          {children}
        </main>
        
        <footer className={styles.footer}>
          <p>&copy; {new Date().getFullYear()} Breaking Finder</p>
        </footer>
      </body>
    </html>
  );
}
