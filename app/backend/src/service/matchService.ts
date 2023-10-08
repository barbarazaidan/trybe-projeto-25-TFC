import SequelizeMatchModel from '../database/models/MatchModel';
import SequelizeTeamModel from '../database/models/TeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchType, { AwayTeamType, HomeTeamType } from '../Interfaces/Matches';

async function getMatches(): Promise<ServiceResponse<MatchType[]>> {
  const matches = await SequelizeMatchModel.findAll({
    include: [
      { model: SequelizeTeamModel, as: 'homeTeam', attributes: ['teamName'] },
      { model: SequelizeTeamModel, as: 'awayTeam', attributes: ['teamName'] },
    ],
  });
  const matchesApenasComDataValues = matches.map((match) => match.dataValues);
  return {
    status: 200,
    data: matchesApenasComDataValues,
  };
}

async function getMatchesInProgress(inProgress: boolean): Promise<ServiceResponse<MatchType[]>> {
  const matches = await SequelizeMatchModel.findAll({
    include: [
      { model: SequelizeTeamModel, as: 'homeTeam', attributes: ['teamName'] },
      { model: SequelizeTeamModel, as: 'awayTeam', attributes: ['teamName'] },
    ],
    where: {
      inProgress,
    },
  });
  const matchesApenasComDataValues = matches.map((match) => match.dataValues);
  return {
    status: 200,
    data: matchesApenasComDataValues,
  };
}

async function finishMatch(id: string): Promise<ServiceResponse<MatchType>> {
  const match = await SequelizeMatchModel.findByPk(id);
  if (!match) {
    return { status: 404, data: { message: 'Partida não encontrada' } };
  }
  if (match.inProgress === false) {
    return { status: 409, data: { message: 'Partida já finalizada' } };
  }
  await match.update({ inProgress: false });
  return { status: 200, data: { message: 'Finished' } };
}

async function updatedMatch(id: string, homeTeamGoals: number, awayTeamGoals: number)
  : Promise<ServiceResponse<MatchType>> {
  const match = await SequelizeMatchModel.findByPk(id);
  if (!match) {
    return { status: 404, data: { message: 'Partida não encontrada' } };
  }
  if (match.inProgress === false) {
    return { status: 409, data: { message: 'Partida já finalizada' } };
  }
  await match.update({ homeTeamGoals, awayTeamGoals });
  return { status: 200, data: { message: 'Updated' } };
}

async function newMatch(homeTeam: HomeTeamType, awayTeam: AwayTeamType)
  : Promise<ServiceResponse<MatchType>> {
  const { homeTeamId, homeTeamGoals } = homeTeam;
  const { awayTeamId, awayTeamGoals } = awayTeam;
  const homeTeamBD = await SequelizeTeamModel.findByPk(homeTeamId);
  const awayTeamBD = await SequelizeTeamModel.findByPk(awayTeamId);
  if (!homeTeamBD || !awayTeamBD) {
    return { status: 404, data: { message: 'Time não encontrado' } };
  }
  const match = await SequelizeMatchModel.create({
    homeTeamId,
    homeTeamGoals,
    awayTeamId,
    awayTeamGoals,
    inProgress: true,
  });
  return { status: 201, data: match };
}

export default {
  getMatches,
  getMatchesInProgress,
  finishMatch,
  updatedMatch,
  newMatch,
};
