import { useEffect, useState } from 'react';
import { createTeam } from '../api/teams';
import { fetchCountries } from '../api/countries';
import type { Country, CreateTeamRequest } from '../types/event';

interface Props {
  onCreated: () => void;
  onCancel: () => void;
}

const EMPTY: CreateTeamRequest = {
  slug: '',
  name: '',
  officialName: '',
  abbreviation: '',
  foundedYear: undefined,
  countryCode: '',
};

export default function AddTeamForm({ onCreated, onCancel }: Props) {
  const [form, setForm] = useState<CreateTeamRequest>(EMPTY);
  const [countries, setCountries] = useState<Country[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCountries().then(setCountries).catch(() => {});
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'foundedYear' ? (value ? Number(value) : undefined) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await createTeam(form);
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
      <h2 className="add-form-title">Add New Team</h2>

      <div className="form-grid">
        <label className="form-field">
          <span className="form-label">Name <span className="required">*</span></span>
          <input
            name="name"
            type="text"
            className="form-input"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="e.g. Al-Hilal"
          />
        </label>

        <label className="form-field">
          <span className="form-label">Official Name <span className="required">*</span></span>
          <input
            name="officialName"
            type="text"
            className="form-input"
            value={form.officialName}
            onChange={handleChange}
            required
            placeholder="e.g. Al-Hilal Saudi FC"
          />
        </label>

        <label className="form-field">
          <span className="form-label">Slug <span className="required">*</span></span>
          <input
            name="slug"
            type="text"
            className="form-input"
            value={form.slug}
            onChange={handleChange}
            required
            placeholder="e.g. al-hilal"
          />
        </label>

        <label className="form-field">
          <span className="form-label">Abbreviation <span className="required">*</span></span>
          <input
            name="abbreviation"
            type="text"
            className="form-input"
            value={form.abbreviation}
            onChange={handleChange}
            required
            maxLength={3}
            placeholder="e.g. HIL"
          />
        </label>

        <label className="form-field">
          <span className="form-label">Country <span className="required">*</span></span>
          <select
            name="countryCode"
            className="form-input"
            value={form.countryCode}
            onChange={handleChange}
            required
          >
            <option value="">— Select country —</option>
            {countries.map(c => (
              <option key={c.code} value={c.code}>{c.name}</option>
            ))}
          </select>
        </label>

        <label className="form-field">
          <span className="form-label">Founded Year</span>
          <input
            name="foundedYear"
            type="number"
            className="form-input"
            value={form.foundedYear ?? ''}
            onChange={handleChange}
            min={1800}
            max={new Date().getFullYear()}
            placeholder="e.g. 1957"
          />
        </label>
      </div>

      {error && <p className="form-error">⚠ {error}</p>}

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? 'Saving…' : 'Save Team'}
        </button>
      </div>
    </form>
  );
}
