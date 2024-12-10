import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export async function getStaticProps() {
  const eventsFilePath = path.join(process.cwd(), 'data', 'events.json');
  const eventsData = JSON.parse(fs.readFileSync(eventsFilePath, 'utf-8'));
  return {
    props: {
      events: eventsData
    }
  };
}

export default function EventsPage({ events }) {
  return (
    <>
      <h1>All Upcoming Events</h1>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <Link href={`/events/${event.id}`}>
              <strong>{event.name}</strong>
            </Link><br />
            {event.date} - {event.location}<br />
            <small>{event.description}</small>
          </li>
        ))}
      </ul>
      <Link href="/">← Back to Home</Link>
    </>
  );
}
