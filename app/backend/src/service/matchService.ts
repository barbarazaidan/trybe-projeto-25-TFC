import SequelizeMatchModel from '../database/models/MatchModel';
import SequelizeTeamModel from '../database/models/TeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchType from '../Interfaces/Matches';

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

export default {
  getMatches,
  getMatchesInProgress,
  finishMatch,
};
