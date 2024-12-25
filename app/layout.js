// app/layout.js
import Link from 'next/link';
import '../styles/global.css'
import styles from './styles.module.css'

export const metadata = {
  title: {
    default: 'Find My Battle',
    template: '%s | Find My Battle'
    }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Navigation Bar */}
        <ul className={styles.navBar}>
          <li className={styles.navItem}>
            <Link href="/" className={styles.navLink}>
              Find My Battle
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/events" className={styles.navLink}>
              Events
            </Link>
          </li>
        </ul>

        <main style={{marginTop: '50px'}}>
          {children}
        </main>
        <footer className={styles.footer}>
          <hr />
          <p>&copy; {new Date().getFullYear()} Find My Battle</p>
        </footer>
      </body>
    </html>
  );
}
