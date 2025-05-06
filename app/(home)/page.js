// app/page.js
'use client';

import { useState, useEffect } from 'react';
import styles from '../styles.module.css';
import Link from 'next/link';

export default function Page() {
  const [highlightedEvents, setHighlightedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        
        // Sort by date and get 3 most recent events
        const sortedEvents = data
          .filter(e => Date.parse(e.date) >= Date.now())
          .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

        setHighlightedEvents(sortedEvents.slice(0, 3));
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <main className={styles.main}>
        <div className={styles.loading}>Loading events...</div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Breaking Finder</h1>
        <p className={styles.description}>
          Find breaking events and connect with the breaking community in Korea
        </p>
        <div className={styles.buttonGroup}>
          <a href="/events" className={styles.button}>Explore Events</a>
        </div>
      </div>
      
      <section className={styles.section}>
        <h2>Highlighted Events</h2>
        <table className={styles.eventsTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {highlightedEvents.map(event => (
              <tr key={event.id}>
                <td>{event.date}</td>
                <td>
                  <Link href={event.url} target="_blank" rel="noopener noreferrer" className={styles.eventLink}>
                    {event.name}
                  </Link>
                </td>
                <td>{event.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
