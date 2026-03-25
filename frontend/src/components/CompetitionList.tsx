import { useEffect, useState } from 'react';
import { fetchCompetitions } from '../api/competitions';
import type { Competition } from '../types/event';

export default function CompetitionList() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCompetitions()
      .then(setCompetitions)
      .catch((e: unknown) =>
        setError(e instanceof Error ? e.message : 'Unknown error')
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-container">
      <div className="event-list-toolbar">
        <div>
          <h1 className="page-title">Competitions</h1>
          <p className="page-subtitle">
            {loading ? 'Loading…' : `${competitions.length} competition${competitions.length !== 1 ? 's' : ''} total`}
          </p>
        </div>
      </div>

      {loading && (
        <div className="state-msg">
          <span className="spinner" />
          Loading competitions…
        </div>
      )}
      {error && <p className="state-msg error">⚠ {error}</p>}
      {!loading && !error && competitions.length === 0 && (
        <p className="state-msg">No competitions found.</p>
      )}

      <div className="card-grid">
        {competitions.map(comp => (
          <div key={comp.id} className="competition-card">
            <div className="competition-card-icon">🏆</div>
            <div className="competition-card-body">
              <span className="competition-card-name">{comp.name}</span>
              <span className="competition-card-id">{comp.id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
