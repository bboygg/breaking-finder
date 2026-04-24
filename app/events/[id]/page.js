import { Suspense } from 'react';
import EventDetailContent from '../../lib/EventDetailContent';
import { getEvents, getEventById } from '../../lib/events';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((event) => ({ id: event.id }));
}

export default async function Page({ params }) {
  const { id } = await params;
  const event = await getEventById(id);
  
  if (!event) {
    notFound();
  }

  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '4rem' }}>Loading details...</div>}>
      <EventDetailContent event={event} />
    </Suspense>
  );
}
