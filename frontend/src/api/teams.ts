import type { Team } from '../types/event';

const BASE = '/api/teams';

export async function fetchTeams(): Promise<Team[]> {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error(`Failed to fetch teams (${res.status})`);
  return res.json();
}

export async function fetchTeam(id: number): Promise<Team> {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch team (${res.status})`);
  return res.json();
}
