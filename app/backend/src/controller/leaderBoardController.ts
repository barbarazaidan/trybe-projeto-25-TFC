import { Request, Response } from 'express';
import leaderBoardHomeService from '../service/leaderBoardHomeService';

async function getLeaderHome(req: Request, res: Response): Promise<void> {
  const serviceResponse = await leaderBoardHomeService.getLeaderHome();
  res.status(serviceResponse.status).json(serviceResponse.data);
}

export default {
  getLeaderHome,
};
