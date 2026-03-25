import type { Stage } from '../types/event';

const BASE = '/api/stages';

export async function fetchStages(): Promise<Stage[]> {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error(`Failed to fetch stages (${res.status})`);
  return res.json();
}
