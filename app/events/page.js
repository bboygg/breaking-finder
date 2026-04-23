import { Suspense } from 'react';
import EventsContent from '../lib/EventsContent';
import { getEvents } from '../lib/events';

export default async function Page() {
  const eventsData = await getEvents();
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '4rem' }}>Loading Events...</div>}>
      <EventsContent eventsData={eventsData} />
    </Suspense>
  );
}
