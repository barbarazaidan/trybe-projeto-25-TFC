import SequelizeTeamModel from '../database/models/TeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamsType from '../Interfaces/Teams';

async function getTeams(): Promise<ServiceResponse<TeamsType[]>> {
  const teams = await SequelizeTeamModel.findAll();
  const teamsApenasComDataValues = teams.map((team) => team.dataValues);
  return {
    status: 200,
    data: teamsApenasComDataValues,
  };
}

export default {
  getTeams,
};
