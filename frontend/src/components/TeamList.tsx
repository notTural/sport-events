import { useEffect, useState } from 'react';
import { fetchTeams } from '../api/teams';
import type { Team } from '../types/event';

export default function TeamList() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTeams()
      .then(setTeams)
      .catch((e: unknown) =>
        setError(e instanceof Error ? e.message : 'Unknown error')
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-container">
      <div className="event-list-toolbar">
        <div>
          <h1 className="page-title">Teams</h1>
          <p className="page-subtitle">
            {loading ? 'Loading…' : `${teams.length} team${teams.length !== 1 ? 's' : ''} total`}
          </p>
        </div>
      </div>

      {loading && (
        <div className="state-msg">
          <span className="spinner" />
          Loading teams…
        </div>
      )}
      {error && <p className="state-msg error">⚠ {error}</p>}
      {!loading && !error && teams.length === 0 && (
        <p className="state-msg">No teams found.</p>
      )}

      <div className="card-grid">
        {teams.map(team => (
          <div key={team.id} className="team-card">
            <div className="team-card-abbr">{team.abbreviation}</div>
            <div className="team-card-body">
              <span className="team-card-name">{team.name}</span>
              <span className="team-card-official">{team.officialName}</span>
              <div className="team-card-meta">
                <span className="team-card-country">{team.countryName}</span>
                {team.foundedYear && (
                  <span className="team-card-founded">Est. {team.foundedYear}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
