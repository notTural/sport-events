import { useEffect, useState } from 'react';
import { createEvent } from '../api/events';
import { fetchCompetitions } from '../api/competitions';
import { fetchStages } from '../api/stages';
import { fetchTeams } from '../api/teams';
import type { Competition, CreateEventRequest, Stage, Team } from '../types/event';

interface Props {
  onCreated: () => void;
  onCancel: () => void;
}

const EMPTY: CreateEventRequest = {
  season: new Date().getFullYear(),
  dateVenue: '',
  timeVenueUtc: '',
  status: 'scheduled',
  competitionId: '',
  stageId: '',
  homeTeamId: undefined,
  awayTeamId: undefined,
};

export default function AddEventForm({ onCreated, onCancel }: Props) {
  const [form, setForm] = useState<CreateEventRequest>(EMPTY);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [stages, setStages] = useState<Stage[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCompetitions().then(setCompetitions).catch(() => {});
    fetchStages().then(setStages).catch(() => {});
    fetchTeams().then(setTeams).catch(() => {});
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]:
        name === 'season' ? Number(value)
        : name === 'homeTeamId' || name === 'awayTeamId' ? (value ? Number(value) : undefined)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await createEvent(form);
      setForm(EMPTY);
      onCreated();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h2 className="add-form-title">Add New Event</h2>

      <div className="form-grid">
        <label className="form-field">
          <span className="form-label">Season <span className="required">*</span></span>
          <input
            name="season"
            type="number"
            className="form-input"
            value={form.season}
            onChange={handleChange}
            required
            min={2000}
            max={2100}
          />
        </label>

        <label className="form-field">
          <span className="form-label">Date <span className="required">*</span></span>
          <input
            name="dateVenue"
            type="date"
            className="form-input"
            value={form.dateVenue}
            onChange={handleChange}
            required
          />
        </label>

        <label className="form-field">
          <span className="form-label">Time (UTC)</span>
          <input
            name="timeVenueUtc"
            type="time"
            className="form-input"
            value={form.timeVenueUtc}
            onChange={handleChange}
          />
        </label>

        <label className="form-field">
          <span className="form-label">Status <span className="required">*</span></span>
          <select
            name="status"
            className="form-input"
            value={form.status}
            onChange={handleChange}
            required
          >
            <option value="scheduled">Scheduled</option>
            <option value="played">Played</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>

        <label className="form-field">
          <span className="form-label">Competition <span className="required">*</span></span>
          <select
            name="competitionId"
            className="form-input"
            value={form.competitionId}
            onChange={handleChange}
            required
          >
            <option value="">— Select competition —</option>
            {competitions.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </label>

        <label className="form-field">
          <span className="form-label">Stage <span className="required">*</span></span>
          <select
            name="stageId"
            className="form-input"
            value={form.stageId}
            onChange={handleChange}
            required
          >
            <option value="">— Select stage —</option>
            {stages.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </label>

        <label className="form-field">
          <span className="form-label">Home Team</span>
          <select
            name="homeTeamId"
            className="form-input"
            value={form.homeTeamId ?? ''}
            onChange={handleChange}
          >
            <option value="">— None —</option>
            {teams.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </label>

        <label className="form-field">
          <span className="form-label">Away Team</span>
          <select
            name="awayTeamId"
            className="form-input"
            value={form.awayTeamId ?? ''}
            onChange={handleChange}
          >
            <option value="">— None —</option>
            {teams.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </label>
      </div>

      {error && <p className="form-error">⚠ {error}</p>}

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? 'Saving…' : 'Save Event'}
        </button>
      </div>
    </form>
  );
}
