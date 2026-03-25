import type { EventResponse } from '../types/event';

interface Props {
  event: EventResponse;
}

const STATUS_LABELS: Record<string, string> = {
  played: 'Played',
  scheduled: 'Scheduled',
  cancelled: 'Cancelled',
};

export default function EventCard({ event }: Props) {
  const date = new Date(event.dateVenue).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const time = event.timeVenueUtc?.slice(0, 5) ?? '—';

  const homeTeam = event.homeTeam?.name ?? 'TBD';
  const awayTeam = event.awayTeam?.name ?? 'TBD';

  return (
    <div className="event-card">
      <div className="event-card-header">
        <span className="competition">{event.competitionName}</span>
        <span className="stage">{event.stageName}</span>
        <span className={`status status--${event.status}`}>
          {STATUS_LABELS[event.status] ?? event.status}
        </span>
      </div>

      <div className="event-card-body">
        <div className="team home">
          <span className="team-abbr">{event.homeTeam?.abbreviation ?? '?'}</span>
          <div className="team-info">
            <span className="team-name">{homeTeam}</span>
            {event.homeTeam?.countryCode && (
              <span className="team-country">{event.homeTeam.countryCode}</span>
            )}
          </div>
        </div>

        <div className="match-info">
          <span className="match-time">{time}</span>
          <span className="versus">UTC</span>
          <span className="match-date">{date}</span>
        </div>

        <div className="team away">
          <div className="team-info">
            <span className="team-name">{awayTeam}</span>
            {event.awayTeam?.countryCode && (
              <span className="team-country">{event.awayTeam.countryCode}</span>
            )}
          </div>
          <span className="team-abbr">{event.awayTeam?.abbreviation ?? '?'}</span>
        </div>
      </div>

      {(event.venueName || event.venueCity) && (
        <div className="event-card-footer">
          📍 {[event.venueName, event.venueCity].filter(Boolean).join(', ')}
        </div>
      )}
    </div>
  );
}
