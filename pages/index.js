import fs from 'fs';
import path from 'path';

export async function getStaticProps() {
  const eventsFilePath = path.join(process.cwd(), 'data', 'events.json');
  const eventsData = JSON.parse(fs.readFileSync(eventsFilePath, 'utf-8'));
  const highlightedEvents = eventsData.slice(0, 2);

  return {
    props: {
      highlightedEvents
    }
  };
}

export default function Home({ highlightedEvents }) {
  return (
    <>      
      <section>
        <h2>About Find My Battle</h2>
        <p>Discover breaking battles, jams, and competitions based in South Korea. Stay up-to-date with the latest events and never miss your battle</p>
        <p>This platform helps you track upcoming battles, from underground sessions to major international competitions.</p>
      </section>
      <p>
        <a href="/events" role="button">Explore Events</a>
        {' '}
        <a href="/calendars" role="button" className="secondary">View Calendar</a>
      </p>      
      <section>
        <h2>Upcoming Battles</h2>
        <ul>
          {highlightedEvents.map(event => (
            <li key={event.id}>
              <strong>{event.name}</strong><br />
              {event.date} | {event.location}<br />
              <small>
                link: <a href={event.url} target="_blank" rel="noopener noreferrer">{event.url}</a>
              </small>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
