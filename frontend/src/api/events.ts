import type { CreateEventRequest, EventResponse } from '../types/event';

const BASE = '/api/events';

export interface EventFilterParams {
  competitionId?: string;
  teamId?: number;
  status?: string;
  sortDate?: 'asc' | 'desc';
}

export async function fetchEvents(params?: EventFilterParams): Promise<EventResponse[]> {
  const qs = new URLSearchParams();
  if (params?.competitionId) qs.set('competitionId', params.competitionId);
  if (params?.teamId != null) qs.set('teamId', String(params.teamId));
  if (params?.status) qs.set('status', params.status);
  if (params?.sortDate) qs.set('sortDate', params.sortDate);
  const url = qs.toString() ? `${BASE}?${qs}` : BASE;
  const res = await fetch(url);
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
