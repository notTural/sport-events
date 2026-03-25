import type { Competition } from '../types/event';

const BASE = '/api/competitions';

export async function fetchCompetitions(): Promise<Competition[]> {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error(`Failed to fetch competitions (${res.status})`);
  return res.json();
}

export async function fetchCompetition(id: string): Promise<Competition> {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch competition (${res.status})`);
  return res.json();
}
