import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const eventsFilePath = path.join(process.cwd(), 'data', 'events.json');
    const eventsData = JSON.parse(fs.readFileSync(eventsFilePath, 'utf-8'));
    
    return NextResponse.json(eventsData);
  } catch (error) {
    console.error('Error reading events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
} 