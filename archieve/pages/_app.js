import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const iconSrc = theme === 'light' ? '/moon.svg' : '/sun.svg';
  const iconAlt = theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode';

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.jade.min.css" />
        <title>Find My Battle</title>
      </Head>

      <header>
        <nav>
          <ul>
            {/* Logo now links to Home */}
            <li><Link href="/"><strong>Find My Battle</strong></Link></li>
          </ul>
          <ul>
            <li><Link href="/events">Events</Link></li>
            <li><Link href="/calendars">Calendar</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li>
              <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <img src={iconSrc} alt={iconAlt} width="42" height="42" />
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Component {...pageProps} />
      </main>

      <footer>
        <hr />
        <p>&copy; {new Date().getFullYear()} Find My Battle</p>
      </footer>
    </>
  );
}

export default MyApp;
