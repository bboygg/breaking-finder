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
      <h1>Find My Battle</h1>
      <p>Discover breaking battles, jams, and competitions worldwide. Stay up-to-date with the latest events and never miss your crew’s next challenge.</p>
      
      <p>
        <a href="/events" role="button">Explore Events</a>
        {' '}
        <a href="/calendars" role="button" className="secondary">View Calendar</a>
      </p>

      <section>
        <h2>About Breaking Events</h2>
        <p>Breaking (B-Boying/B-Girling) is a dynamic street dance from the hip-hop culture. 
          This platform helps you track upcoming battles, from underground sessions to major international competitions.</p>
      </section>
      
      <section>
        <h2>Highlighted Upcoming Battles</h2>
        <ul>
          {highlightedEvents.map(event => (
            <li key={event.id}>
              <strong>{event.name}</strong><br />
              {event.date} - {event.location}<br />
              <small>{event.description}</small>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
