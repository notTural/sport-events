import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchEventDetail } from '../api/events';
import type { EventDetail, GoalDto, CardDto } from '../types/event';

const GOAL_TYPE_LABELS: Record<string, string> = {
  normal: 'Goal',
  penalty: 'Penalty',
  own_goal: 'Own Goal',
};

const CARD_TYPE_LABELS: Record<string, string> = {
  yellow: 'Yellow',
  red: 'Red',
  yellow_red: 'Second Yellow',
};

function goalTypeLabel(type: string | null) {
  if (!type) return '';
  return GOAL_TYPE_LABELS[type.toLowerCase()] ?? type;
}

function cardTypeLabel(type: string) {
  return CARD_TYPE_LABELS[type.toLowerCase()] ?? type;
}

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchEventDetail(Number(id))
      .then(setEvent)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Unknown error'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="state-msg">
        <span className="spinner" />
        Loading event…
      </div>
    );
  }

  if (error || !event) {
    return <p className="state-msg error">⚠ {error ?? 'Event not found'}</p>;
  }

  const date = new Date(event.dateVenue).toLocaleDateString('en-GB', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
  });
  const time = event.timeVenueUtc?.slice(0, 5) ?? null;

  const homeTeam = event.homeTeam;
  const awayTeam = event.awayTeam;

  const r = event.result;

  const homeGoals = r?.goals.filter(g => g.teamId === homeTeam?.id) ?? [];
  const awayGoals = r?.goals.filter(g => g.teamId === awayTeam?.id) ?? [];
  const homeCards = r?.cards.filter(c => c.teamId === homeTeam?.id) ?? [];
  const awayCards = r?.cards.filter(c => c.teamId === awayTeam?.id) ?? [];

  return (
    <div className="detail-page">

      {/* ── Back + badges ─────────────────────────────────── */}
      <div className="detail-nav">
        <button className="detail-back-btn" onClick={() => navigate('/events')}>
          ← Back to Events
        </button>
        <div className="detail-badges">
          <span className="detail-competition">{event.competitionName}</span>
          <span className="detail-dot">·</span>
          <span className="detail-stage">{event.stageName}</span>
          <span className={`status status--${event.status}`}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </span>
        </div>
      </div>

      {/* ── Season + date ─────────────────────────────────── */}
      <p className="detail-meta">
        {event.season} Season
        {time ? ` · ${date} · ${time} UTC` : ` · ${date}`}
      </p>

      {/* ── Match header ──────────────────────────────────── */}
      <div className="detail-match-block">
        <div className="detail-team detail-team--home">
          <span className="detail-team-abbr">{homeTeam?.abbreviation ?? '?'}</span>
          <div className="detail-team-info">
            <span className="detail-team-name">{homeTeam?.name ?? 'TBD'}</span>
            {homeTeam?.officialName && (
              <span className="detail-team-official">{homeTeam.officialName}</span>
            )}
            {homeTeam?.countryCode && (
              <span className="detail-team-country">{homeTeam.countryCode}</span>
            )}
          </div>
        </div>

        <div className="detail-score-block">
          {r ? (
            <span className="detail-score">{r.homeScore} – {r.awayScore}</span>
          ) : (
            <span className="detail-vs">VS</span>
          )}
        </div>

        <div className="detail-team detail-team--away">
          <div className="detail-team-info detail-team-info--right">
            <span className="detail-team-name">{awayTeam?.name ?? 'TBD'}</span>
            {awayTeam?.officialName && (
              <span className="detail-team-official">{awayTeam.officialName}</span>
            )}
            {awayTeam?.countryCode && (
              <span className="detail-team-country">{awayTeam.countryCode}</span>
            )}
          </div>
          <span className="detail-team-abbr">{awayTeam?.abbreviation ?? '?'}</span>
        </div>
      </div>

      {/* ── Venue ─────────────────────────────────────────── */}
      {(event.venueName || event.venueCity) && (
        <div className="detail-section">
          <h3 className="detail-section-title">Venue</h3>
          <div className="detail-venue-card">
            <span className="detail-venue-name">
              {[event.venueName, event.venueCity, event.venueCountry].filter(Boolean).join(', ')}
            </span>
            {event.venueCapacity != null && (
              <span className="detail-venue-capacity">
                Capacity: {event.venueCapacity.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      )}

      {/* ── Result ────────────────────────────────────────── */}
      {r && (
        <>
          <div className="detail-section">
            <h3 className="detail-section-title">Result</h3>
            <div className="detail-outcome-banner">
              <div className="detail-outcome-score">
                <span>{homeTeam?.name ?? 'Home'}</span>
                <span className="detail-outcome-scoreline">{r.homeScore} – {r.awayScore}</span>
                <span>{awayTeam?.name ?? 'Away'}</span>
              </div>
              <div className="detail-outcome-winner">
                {r.winnerTeamName
                  ? <>Winner: <strong>{r.winnerTeamName}</strong></>
                  : <strong>Draw</strong>
                }
              </div>
              {r.message && (
                <p className="detail-outcome-message">{r.message}</p>
              )}
            </div>
          </div>

          {/* ── Goals ──────────────────────────────────────── */}
          {r.goals.length > 0 && (
            <div className="detail-section">
              <h3 className="detail-section-title">Goals</h3>
              <div className="detail-events-columns">
                <div className="detail-events-col">
                  {homeGoals.map((g, i) => <GoalRow key={i} goal={g} side="home" />)}
                </div>
                <div className="detail-events-col detail-events-col--away">
                  {awayGoals.map((g, i) => <GoalRow key={i} goal={g} side="away" />)}
                </div>
              </div>
            </div>
          )}

          {/* ── Cards ──────────────────────────────────────── */}
          {r.cards.length > 0 && (
            <div className="detail-section">
              <h3 className="detail-section-title">Cards</h3>
              <div className="detail-events-columns">
                <div className="detail-events-col">
                  {homeCards.map((c, i) => <CardRow key={i} card={c} side="home" />)}
                </div>
                <div className="detail-events-col detail-events-col--away">
                  {awayCards.map((c, i) => <CardRow key={i} card={c} side="away" />)}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function GoalRow({ goal, side }: { goal: GoalDto; side: 'home' | 'away' }) {
  const type = goalTypeLabel(goal.goalType);
  return (
    <div className={`detail-event-row detail-event-row--${side}`}>
      <span className="detail-event-minute">{goal.minute ?? '?'}'</span>
      <span className="detail-event-icon">⚽</span>
      <div className="detail-event-text">
        <span className="detail-event-player">{goal.playerName ?? '—'}</span>
        {type && <span className="detail-event-type">{type}</span>}
      </div>
    </div>
  );
}

function CardRow({ card, side }: { card: CardDto; side: 'home' | 'away' }) {
  const type = card.cardType.toLowerCase();
  const icon = type === 'red' || type === 'yellow_red' ? '🟥' : '🟨';
  return (
    <div className={`detail-event-row detail-event-row--${side}`}>
      <span className="detail-event-minute">{card.minute ?? '?'}'</span>
      <span className="detail-event-icon">{icon}</span>
      <div className="detail-event-text">
        <span className="detail-event-player">{card.playerName ?? '—'}</span>
        <span className="detail-event-type">{cardTypeLabel(card.cardType)}</span>
      </div>
    </div>
  );
}
