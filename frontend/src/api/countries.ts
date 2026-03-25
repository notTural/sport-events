import type { Country } from '../types/event';

const BASE = '/api/countries';

export async function fetchCountries(): Promise<Country[]> {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error(`Failed to fetch countries (${res.status})`);
  return res.json();
}
