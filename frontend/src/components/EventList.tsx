import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchEvents } from '../api/events';
import type { EventFilterParams } from '../api/events';
import { fetchCompetitions } from '../api/competitions';
import { fetchTeams } from '../api/teams';
import type { Competition, EventResponse, Team } from '../types/event';
import EventCard from './EventCard';
import AddEventForm from './AddEventForm';

const STATUSES = ['scheduled', 'played', 'cancelled'];

function filtersFromParams(params: URLSearchParams): EventFilterParams {
  return {
    competitionId: params.get('competitionId') || undefined,
    teamId: params.get('teamId') ? Number(params.get('teamId')) : undefined,
    status: params.get('status') || undefined,
    sortDate: (params.get('sortDate') as 'asc' | 'desc') || 'asc',
  };
}

export default function EventList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = filtersFromParams(searchParams);

  const [events, setEvents] = useState<EventResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    fetchCompetitions().then(setCompetitions).catch(() => {});
    fetchTeams().then(setTeams).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchEvents(filters)
      .then(setEvents)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Unknown error'))
      .finally(() => setLoading(false));
  }, [searchParams]);

  const setParam = (name: string, value: string | undefined) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (value) next.set(name, value);
      else next.delete(name);
      return next;
    }, { replace: true });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setParam(name, value || undefined);
  };

  const toggleSort = () => {
    setParam('sortDate', filters.sortDate === 'asc' ? 'desc' : 'asc');
  };

  const clearFilters = () => setSearchParams(new URLSearchParams(), { replace: true });

  const isFiltered = !!filters.competitionId || filters.teamId != null || !!filters.status;

  const handleCreated = () => {
    setShowForm(false);
    fetchEvents(filters).then(setEvents).catch(() => {});
  };

  return (
    <div className="event-list-container">
      <div className="event-list-toolbar">
        <div>
          <h1 className="page-title">Events</h1>
          <p className="page-subtitle">
            {loading ? 'Loading…' : `${events.length} event${events.length !== 1 ? 's' : ''} found`}
          </p>
        </div>
        {!showForm && (
          <button className="btn-primary" onClick={() => setShowForm(true)}>
            + Add Event
          </button>
        )}
      </div>

      {showForm && (
        <AddEventForm
          onCreated={handleCreated}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="filter-bar">
        <select
          name="competitionId"
          className="filter-select"
          value={filters.competitionId ?? ''}
          onChange={handleFilterChange}
        >
          <option value="">All competitions</option>
          {competitions.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <select
          name="teamId"
          className="filter-select"
          value={filters.teamId ?? ''}
          onChange={handleFilterChange}
        >
          <option value="">All teams</option>
          {teams.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>

        <select
          name="status"
          className="filter-select"
          value={filters.status ?? ''}
          onChange={handleFilterChange}
        >
          <option value="">All statuses</option>
          {STATUSES.map(s => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>

        <button className="filter-sort-btn" onClick={toggleSort} title="Toggle date sort">
          Date {filters.sortDate === 'asc' ? '↑' : '↓'}
        </button>

        {isFiltered && (
          <button className="filter-clear-btn" onClick={clearFilters}>
            Clear filters
          </button>
        )}
      </div>

      {loading && (
        <div className="state-msg">
          <span className="spinner" />
          Loading events…
        </div>
      )}
      {error && <p className="state-msg error">⚠ {error}</p>}
      {!loading && !error && events.length === 0 && (
        <p className="state-msg">No events match the selected filters.</p>
      )}

      <div className="event-grid">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
