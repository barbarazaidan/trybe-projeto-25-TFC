export default interface MatchType {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface HomeTeamType {
  homeTeamId: number,
  homeTeamGoals: number,
}

export interface AwayTeamType {
  awayTeamId: number,
  awayTeamGoals: number,
}

export interface MatchResultType {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
  homeTeam: {
    teamName: string
  },
  awayTeam: {
    teamName: string
  }
}
