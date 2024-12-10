import fs from 'fs';
import path from 'path';

export async function getStaticPaths() {
  const eventsFilePath = path.join(process.cwd(), 'data', 'events.json');
  const eventsData = JSON.parse(fs.readFileSync(eventsFilePath, 'utf-8'));

  const paths = eventsData.map(event => ({ params: { id: event.id } }));
  
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const eventsFilePath = path.join(process.cwd(), 'data', 'events.json');
  const eventsData = JSON.parse(fs.readFileSync(eventsFilePath, 'utf-8'));

  const event = eventsData.find(e => e.id === params.id);

  return {
    props: {
      event
    }
  };
}

export default function EventDetailPage({ event }) {
  return (
    <>
      <h1>{event.name}</h1>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p>{event.description}</p>
      <a href="/events">← Back to Events</a>
    </>
  );
}
