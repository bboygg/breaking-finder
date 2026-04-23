import { Suspense } from 'react';
import HomeContent from '../lib/HomeContent';
import { getEvents } from '../lib/events';

export default async function Page() {
  const initialEvents = await getEvents();
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '4rem' }}>Loading Breaking Finder...</div>}>
      <HomeContent initialEvents={initialEvents} />
    </Suspense>
  );
}
