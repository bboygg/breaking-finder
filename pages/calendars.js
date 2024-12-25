import fs from 'fs';
import path from 'path';
import { useState } from 'react';

export async function getStaticProps() {
  const eventsFilePath = path.join(process.cwd(), 'data', 'events.json');
  const eventsData = JSON.parse(fs.readFileSync(eventsFilePath, 'utf-8'));
  return {
    props: {
      events: eventsData
    }
  };
}

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarsPage({ events }) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1)); // January 2025
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const eventsByDate = {};
  events.forEach(e => {
    eventsByDate[e.date] = eventsByDate[e.date] || [];
    eventsByDate[e.date].push(e);
  });

  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = endOfMonth.getDate();

  // Index of the first day (0=Sunday)
  const firstDayIndex = startOfMonth.getDay();

  const calendarCells = [];
  for (let i = 0; i < firstDayIndex; i++) {
    calendarCells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(day);
  }

  const [selectedDate, setSelectedDate] = useState(null);

  const selectDate = (day) => {
    if (!day) return;
    const dateString = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    if (eventsByDate[dateString]) {
      setSelectedDate(dateString);
    } else {
      setSelectedDate(null);
    }
  };

  const nextMonth = () => {
    const next = new Date(year, month + 1, 1);
    setCurrentDate(next);
    setSelectedDate(null);
  };

  const prevMonth = () => {
    const prev = new Date(year, month - 1, 1);
    setCurrentDate(prev);
    setSelectedDate(null);
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", 
                      "July", "August", "September", "October", "November", "December"];

  return (
    <>
      <h1>Calendar</h1>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <button onClick={prevMonth}>&larr; Previous</button>
        <strong>{monthNames[month]} {year}</strong>
        <button onClick={nextMonth}>Next &rarr;</button>
      </nav>

      <table>
        <thead>
          <tr>
            {weekdays.map((dayName) => (
              <th key={dayName}>{dayName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.ceil(calendarCells.length / 7) }, (_, rowIndex) => {
            const rowCells = calendarCells.slice(rowIndex * 7, rowIndex * 7 + 7);
            return (
              <tr key={rowIndex}>
                {rowCells.map((c, colIndex) => {
                  if (c === null) {
                    return <td key={colIndex}></td>;
                  }

                  const dateString = `${year}-${String(month+1).padStart(2,'0')}-${String(c).padStart(2,'0')}`;
                  const hasEvents = !!eventsByDate[dateString];

                  return (
                    <td
                      key={colIndex} 
                      onClick={() => selectDate(c)}
                      style={{ 
                        cursor: hasEvents ? 'pointer' : 'default', 
                        background: hasEvents ? 'var(--color-background-secondary)' : 'transparent',
                        verticalAlign: 'top', 
                        padding: '10px', 
                        textAlign: 'center'
                      }}
                    >
                      <div style={{ fontWeight: 'bold' }}>{c}</div>
                      {hasEvents && (
                          <div 
                          style={{ 
                            width: '8px', 
                            height: '8px', 
                            borderRadius: '50%', 
                            backgroundColor: 'red', 
                            margin: '5px auto 0' 
                          }}
                        ></div>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {selectedDate && (
        <section style={{ marginTop: '1rem' }}>
          <h2>Events on {selectedDate}</h2>
          <ul>
            {eventsByDate[selectedDate].map(e => (
              <li key={e.id}>
                <strong>{e.name}</strong><br />
                {e.location}<br />
                <small>{e.description}</small>
                <p>
                link:{" "}
                <a href={e.url} target="_blank" rel="noopener noreferrer">{e.url}</a>
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <a href="/">← Back to Home</a>
    </>
  );
}
