import fs from 'fs';
import path from 'path';

/**
 * Loads event data based on the current environment.
 * Local development uses data/events.dev.json
 * Production uses data/events.prod.json
 */
export async function getEvents() {
  const isProd = process.env.NODE_ENV === 'production';
  const fileName = isProd ? 'events.prod.json' : 'events.dev.json';
  const filePath = path.join(process.cwd(), 'data', fileName);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const rawData = JSON.parse(fileContent);

    // Ensure data consistency (Mapping prod data to our required schema)
    return rawData.map(event => ({
      id: event.id || Math.random().toString(36).substr(2, 9),
      status: event.status || 'Done', // Prod data default to Done as requested
      hasPrize: event.hasPrize ?? false,
      startDate: event.startDate || event.date || '',
      endDate: event.endDate || event.date || '',
      isMultiDay: event.isMultiDay ?? false,
      event_time: {
        start: event.event_time?.start || (event.date ? `${event.date} 00:00` : ''),
        end: event.event_time?.end || (event.date ? `${event.date} 23:59` : '')
      },
      registration: {
        start: event.registration?.start || '',
        end: event.registration?.end || ''
      },
      type: event.type || 'Others',
      formats: Array.isArray(event.formats) ? event.formats : [],
      name: {
        ko: event.name?.ko || event.name || '',
        en: event.name?.en || event.name || ''
      },
      location: {
        venue: {
          ko: event.location?.venue?.ko || event.location?.venue || 'TBA',
          en: event.location?.venue?.en || event.location?.venue || 'TBA'
        },
        city: {
          ko: event.location?.city?.ko || event.location?.city || '',
          en: event.location?.city?.en || event.location?.city || ''
        },
        country: {
          ko: event.location?.country?.ko || event.location?.country || '',
          en: event.location?.country?.en || event.location?.country || ''
        }
      },
      url: event.url || '#',
      description: {
        ko: event.description?.ko || '',
        en: event.description?.en || ''
      }
    }));
  } catch (error) {
    console.error(`Error loading events from ${fileName}:`, error);
    return [];
  }
}

export async function getEventById(id) {
  const events = await getEvents();
  return events.find(e => e.id === id);
}
