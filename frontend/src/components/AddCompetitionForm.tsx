import { useState } from 'react';
import { createCompetition } from '../api/competitions';
import type { CreateCompetitionRequest } from '../types/event';

interface Props {
  onCreated: () => void;
  onCancel: () => void;
}

const EMPTY: CreateCompetitionRequest = { id: '', name: '' };

export default function AddCompetitionForm({ onCreated, onCancel }: Props) {
  const [form, setForm] = useState<CreateCompetitionRequest>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await createCompetition(form);
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
      <h2 className="add-form-title">Add New Competition</h2>

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
            placeholder="e.g. AFC Champions League"
          />
        </label>

        <label className="form-field">
          <span className="form-label">ID <span className="required">*</span></span>
          <input
            name="id"
            type="text"
            className="form-input"
            value={form.id}
            onChange={handleChange}
            required
            placeholder="e.g. afc-champions-league"
          />
          <span className="form-hint">Unique slug-style identifier</span>
        </label>
      </div>

      {error && <p className="form-error">⚠ {error}</p>}

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? 'Saving…' : 'Save Competition'}
        </button>
      </div>
    </form>
  );
}
