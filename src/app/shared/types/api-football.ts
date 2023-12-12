export interface Response {
  get: string;
  parameters: Parameters;
  errors?: null[] | null;
  results: number;
  paging: Paging;
  response?: ResponsePayload[] | null;
}

export interface Parameters {
  season?: string;
  code?: string;
  id?: string;
}

export interface Paging {
  current: number;
  total: number;
}

export interface ResponsePayload {
  league: League;
  country: Country;
  seasons?: SeasonsEntity[] | null;
}

export interface League {
  id: number;
  name: string;
  type: string;
  logo: string;
  country?: string;
  flag?: string;
  season?: number;
  standings?: Array<Standing[]>;
}

export interface Standing {
  rank: number;
  team: Team;
  points: number;
  goalsDiff: number;
  group: string;
  form: string;
  status: string;
  description: null | string;
  all: All;
  home: All;
  away: All;
  update: Date;
}

export interface Goals {
  for: number;
  against: number;
}

export enum Status {
  Same = "same"
}

export interface Team {
  id: number;
  name: string;
  logo: string;
}

export interface All {
  played: number;
  win: number;
  draw: number;
  lose: number;
  goals: Goals;
}

export interface Country {
  name: string;
  code: string;
  flag: string;
}

export interface SeasonsEntity {
  year: number;
  start: string;
  end: string;
  current: boolean;
  coverage: Coverage;
}

export interface Coverage {
  fixtures: Fixtures;
  standings: boolean;
  players: boolean;
  top_scorers: boolean;
  top_assists: boolean;
  top_cards: boolean;
  injuries: boolean;
  predictions: boolean;
  odds: boolean;
}

export interface Fixtures {
  events: boolean;
  lineups: boolean;
  statistics_fixtures: boolean;
  statistics_players: boolean;
}
