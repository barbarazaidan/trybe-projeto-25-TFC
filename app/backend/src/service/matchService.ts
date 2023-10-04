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

export default {
  getMatches,
};
