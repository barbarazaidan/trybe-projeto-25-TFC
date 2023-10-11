export default interface TeamsType {
  id: number,
  teamName: string,
}

export interface TeamPerformanceType {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  // goalsTotal: number,
  // efficiency: number,
}
