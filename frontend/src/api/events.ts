import type { EventResponse } from '../types/event';

const BASE = '/api/events';

export async function fetchEvents(): Promise<EventResponse[]> {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error(`Failed to fetch events (${res.status})`);
  return res.json();
}
