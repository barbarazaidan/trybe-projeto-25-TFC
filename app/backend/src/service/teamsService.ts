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

async function getOneTeam(id: number): Promise<ServiceResponse<TeamsType>> {
  const team = await SequelizeTeamModel.findByPk(id);

  if (team) {
    return {
      status: 200,
      data: team.dataValues,
    };
  }
  return { status: 401, data: { message: 'Time não encontrado' } };
}

export default {
  getTeams,
  getOneTeam,
};
