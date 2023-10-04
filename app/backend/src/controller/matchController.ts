import { Request, Response } from 'express';
import matchService from '../service/matchService';

async function getMatches(req: Request, res: Response): Promise<void> {
  const serviceResponse = await matchService.getMatches();
  res.status(serviceResponse.status).json(serviceResponse.data);
}

export default {
  getMatches,
};
