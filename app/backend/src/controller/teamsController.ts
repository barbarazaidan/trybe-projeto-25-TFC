import { Request, Response } from 'express';
import teamsService from '../service/teamsService';

async function getTeams(req: Request, res: Response): Promise<void> {
  const serviceResponse = await teamsService.getTeams();
  res.status(serviceResponse.status).json(serviceResponse.data);
}

export default {
  getTeams,
};
