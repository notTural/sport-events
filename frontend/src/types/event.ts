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
