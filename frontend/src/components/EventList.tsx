import { useEffect, useState } from 'react';
import { fetchEvents } from '../api/events';
import type { EventResponse } from '../types/event';
import EventCard from './EventCard';

export default function EventList() {
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = () => {
    setLoading(true);
    setError(null);
    fetchEvents()
      .then(setEvents)
      .catch((e: unknown) =>
        setError(e instanceof Error ? e.message : 'Unknown error')
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div className="event-list-container">
      <div className="event-list-toolbar">
        <div>
          <h1 className="page-title">Events</h1>
          <p className="page-subtitle">
            {loading ? 'Loading…' : `${events.length} event${events.length !== 1 ? 's' : ''} total`}
          </p>
        </div>
      </div>

      {loading && (
        <div className="state-msg">
          <span className="spinner" />
          Loading events…
        </div>
      )}
      {error && <p className="state-msg error">⚠ {error}</p>}
      {!loading && !error && events.length === 0 && (
        <p className="state-msg">No events found.</p>
      )}

      <div className="event-grid">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
