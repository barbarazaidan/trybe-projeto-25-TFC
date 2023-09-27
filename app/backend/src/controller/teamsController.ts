import { Request, Response } from 'express';
import teamsService from '../service/teamsService';

async function getTeams(req: Request, res: Response): Promise<void> {
  const serviceResponse = await teamsService.getTeams();
  res.status(serviceResponse.status).json(serviceResponse.data);
}

async function getOneTeam(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const serviceResponse = await teamsService.getOneTeam(Number(id));
  res.status(serviceResponse.status).json(serviceResponse.data);
}

export default {
  getTeams,
  getOneTeam,
};
