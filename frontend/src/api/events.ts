import type { CreateEventRequest, EventResponse } from '../types/event';

const BASE = '/api/events';

export async function fetchEvents(): Promise<EventResponse[]> {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error(`Failed to fetch events (${res.status})`);
  return res.json();
}

export async function createEvent(data: CreateEventRequest): Promise<EventResponse> {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to create event (${res.status})`);
  return res.json();
}
