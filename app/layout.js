// app/layout.js
import Link from 'next/link';
import styles from './styles.module.css'
import './global.css'

export const metadata = {
  title:  {
    default: 'Breaking Finder',
    template: '%s | Breaking Finder'
    },
  description: 'Discover breaking battles, chypher, and worshops and more. Stay up-to-date with the breaking community.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#ffffff'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        {/* Navigation Bar */}
        <nav className={styles.navBar}>
          <div className={styles.navLeft}>
            <Link href="/" className={styles.navLink}>
              Breaking Finder
            </Link>
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
