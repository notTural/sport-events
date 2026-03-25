export interface TeamDto {
  id: number;
  name: string;
  officialName: string;
  abbreviation: string;
  countryCode: string;
}

export interface Team {
  id: number;
  slug: string;
  name: string;
  officialName: string;
  abbreviation: string;
  foundedYear: number | null;
  countryCode: string;
  countryName: string;
}

export interface Competition {
  id: string;
  name: string;
}

export interface Stage {
  id: string;
  name: string;
  ordering: number;
}

export interface Country {
  code: string;
  name: string;
}

export interface EventResponse {
  id: number;
  season: number;
  dateVenue: string;
  timeVenueUtc: string;
  status: string;
  competitionId: string;
  competitionName: string;
  stageId: string;
  stageName: string;
  homeTeam: TeamDto | null;
  awayTeam: TeamDto | null;
  venueName: string | null;
  venueCity: string | null;
}

export interface CreateEventRequest {
  season: number;
  dateVenue: string;
  timeVenueUtc: string;
  status: string;
  competitionId: string;
  stageId: string;
  homeTeamId?: number;
  awayTeamId?: number;
}

export interface CreateTeamRequest {
  slug: string;
  name: string;
  officialName: string;
  abbreviation: string;
  foundedYear?: number;
  countryCode: string;
}

export interface CreateCompetitionRequest {
  id: string;
  name: string;
}

export interface GoalDto {
  teamId: number | null;
  teamName: string | null;
  playerName: string | null;
  minute: number | null;
  goalType: string | null;
}

export interface CardDto {
  teamId: number | null;
  teamName: string | null;
  playerName: string | null;
  minute: number | null;
  cardType: string;
}

export interface ResultDetail {
  winnerTeamId: number | null;
  winnerTeamName: string | null;
  message: string | null;
  homeScore: number;
  awayScore: number;
  goals: GoalDto[];
  cards: CardDto[];
}

export interface EventDetail {
  id: number;
  season: number;
  dateVenue: string;
  timeVenueUtc: string | null;
  status: string;
  competitionId: string;
  competitionName: string;
  stageId: string;
  stageName: string;
  homeTeam: TeamDto | null;
  awayTeam: TeamDto | null;
  venueName: string | null;
  venueCity: string | null;
  venueCapacity: number | null;
  venueCountry: string | null;
  result: ResultDetail | null;
}
