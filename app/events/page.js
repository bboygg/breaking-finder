'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles.module.css';

const ITEMS_PER_PAGE = 10;

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        // Sort events by date in descending order
        const sortedEvents = data.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        setEvents(sortedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentEvents = events.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <main className={styles.main}>
        <div className={styles.loading}>Loading events...</div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <h1>All Events</h1>
      <table className={styles.eventsTable}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {currentEvents.map(event => (
            <tr key={event.id}>
              <td>{event.date}</td>
              <td>{event.category}</td>
              <td>
                <a href={event.url} target="_blank" rel="noopener noreferrer" className={styles.eventLink}>
                  {event.name}
                </a>
              </td>
              <td>{event.location}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.paginationButton}
        >
          ⬅️
        </button>
        
        <div className={styles.pageNumbers}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`${styles.pageNumber} ${currentPage === page ? styles.activePage : ''}`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.paginationButton}
        >
          ➡️
        </button>
      </div>

      <div className={styles.backLink}>
        <Link href="/" className={styles.backButton}>
          ↩ Back to Home
        </Link>
      </div>
    </main>
  );
}
