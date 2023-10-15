import { TeamPerformanceByMatchType, TeamPerformanceType } from '../Interfaces/Teams';
import SequelizeMatchModel from '../database/models/MatchModel';
import SequelizeTeamModel from '../database/models/TeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { MatchResultType } from '../Interfaces/Matches';

async function getMatchesEnded(inProgress: boolean): Promise<MatchResultType[]> {
  const matches = await SequelizeMatchModel.findAll({
    include: [
      { model: SequelizeTeamModel, as: 'homeTeam', attributes: ['teamName'] },
      { model: SequelizeTeamModel, as: 'awayTeam', attributes: ['teamName'] },
    ],
    where: {
      inProgress,
    },
  });
  const matchesApenasComDataValues = matches.map((match) => match.dataValues) as MatchResultType[];
  return matchesApenasComDataValues;
}

function formatedMatchesEndend(matches: MatchResultType[]): MatchResultType[] {
  const matchesFormatedNameTeams = matches.map((match) => {
    const {
      id, homeTeam, homeTeamId, homeTeamGoals, awayTeamId, awayTeam, awayTeamGoals, inProgress,
    } = match;
    return {
      id,
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress,
      homeTeam: { teamName: homeTeam.teamName },
      awayTeam: { teamName: awayTeam.teamName },
    };
  });
  return matchesFormatedNameTeams;
}

function calculateTotalPoints(homeTeamGoals: number, awayTeamGoals: number): number {
  if (homeTeamGoals > awayTeamGoals) {
    return 3;
  } if (homeTeamGoals === awayTeamGoals) {
    return 1;
  }
  return 0;
}

function teamsPontuationByMatch(matchesEnded: MatchResultType[]): TeamPerformanceByMatchType[] {
  const lista = matchesEnded.map((match) => {
    const { homeTeam, homeTeamGoals, awayTeamGoals } = match;
    const name = homeTeam.teamName;
    const totalPoints = calculateTotalPoints(homeTeamGoals, awayTeamGoals);
    return {
      name,
      totalPoints,
      totalGames: 1,
      totalVictories: homeTeamGoals > awayTeamGoals ? 1 : 0,
      totalDraws: homeTeamGoals === awayTeamGoals ? 1 : 0,
      totalLosses: homeTeamGoals < awayTeamGoals ? 1 : 0,
      goalsFavor: homeTeamGoals,
      goalsOwn: awayTeamGoals,
    };
  });
  return lista;
}

function calculoDaPontuacaoPorTime(lista: TeamPerformanceByMatchType[], name: string)
  : TeamPerformanceByMatchType {
  const timesIguais = lista.filter((elemento) => elemento.name === name);
  const somatorioPorTime = timesIguais.reduce((acc, elemento) => {
    const {
      totalPoints, totalGames, totalVictories, totalDraws, totalLosses, goalsFavor, goalsOwn,
    } = elemento;
    return {
      name,
      totalPoints: acc.totalPoints + totalPoints,
      totalGames: acc.totalGames + totalGames,
      totalVictories: acc.totalVictories + totalVictories,
      totalDraws: acc.totalDraws + totalDraws,
      totalLosses: acc.totalLosses + totalLosses,
      goalsFavor: acc.goalsFavor + goalsFavor,
      goalsOwn: acc.goalsOwn + goalsOwn,
    };
  });
  return somatorioPorTime;
}

function teamsRanking(lista: TeamPerformanceByMatchType[]): TeamPerformanceByMatchType[] {
  const listaFinal: TeamPerformanceByMatchType[] = [];
  lista.forEach((equipe) => {
    const { name } = equipe;
    const somatorioPorTime = calculoDaPontuacaoPorTime(lista, name);
    if (!listaFinal.some((elemento) => elemento.name === name)) {
      listaFinal.push(somatorioPorTime);
    }
  });
  return listaFinal;
}

function teamsRankingFinal(lista: TeamPerformanceByMatchType[]): TeamPerformanceType[] {
  const rankingFinal = lista.map((time) => {
    const {
      name, totalPoints, totalGames, totalVictories, totalDraws, totalLosses, goalsFavor, goalsOwn,
    } = time;
    return {
      name,
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: ((totalPoints / (totalGames * 3)) * 100).toFixed(2),
    };
  });
  return rankingFinal;
}

function rankingOrdenado(rankingFinal: TeamPerformanceType[]): TeamPerformanceType[] {
  const resultadoRankingOrdenado = rankingFinal.sort((a, b) => {
    if (a.totalPoints !== b.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    if (a.totalVictories !== b.totalVictories) {
      return b.totalVictories - a.totalVictories;
    }
    if (a.goalsBalance !== b.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    }
    return b.goalsFavor - a.goalsFavor;
  });
  return resultadoRankingOrdenado;
}

async function getLeaderHome(): Promise<ServiceResponse<TeamPerformanceType[]>> {
  const inProgress = false; // vou rankear apenas as partidas que já acabaram
  const matchesEnded = await getMatchesEnded(inProgress);

  // o retorno dos matchesEnded traz dataValues na chave de homeTeam e awayTeam, por isso precisei formatar
  const formatedMatches = formatedMatchesEndend(matchesEnded);

  // retorna uma lista com a pontuação de cada time por partida
  const teamsWithPontuationByMatch = teamsPontuationByMatch(formatedMatches);

  // retorna a pontuação de cada time somando todas as partidas, mas sem as propriedades goalsBalance e efficiency
  const ranking = teamsRanking(teamsWithPontuationByMatch);

  // retorna a pontuação de cada time somando todas as partidas, com as propriedades goalsBalance e efficiency
  const rankingFinal = teamsRankingFinal(ranking);

  // retorna o ranking final ordenado de forma decrescente com base no total de pontos (desempate: vitórias, saldo de gols e gols a favor)
  const rankingFinalOrdenado = rankingOrdenado(rankingFinal);

  return {
    status: 200,
    data: rankingFinalOrdenado,
  };
}

export default {
  getLeaderHome,
};
