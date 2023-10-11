import { Request, Response } from 'express';
import matchService from '../service/matchService';
import isInProgress from '../utils/isInProgressQuery';

async function getMatches(req: Request, res: Response): Promise<void> {
  const { inProgress } = req.query;
  const inProgressBoolean = isInProgress(inProgress);
  if (inProgressBoolean === undefined) {
    const serviceResponse = await matchService.getMatches();
    res.status(serviceResponse.status).json(serviceResponse.data);
  } else {
    const serviceResponse = await matchService.getMatchesInProgress(inProgressBoolean);
    res.status(serviceResponse.status).json(serviceResponse.data);
  }
}

async function finishMatch(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  // console.log(typeof id);
  const serviceResponse = await matchService.finishMatch(id);
  res.status(serviceResponse.status).json(serviceResponse.data);
}

async function updatedMatch(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const serviceResponse = await matchService.updatedMatch(id, homeTeamGoals, awayTeamGoals);
  res.status(serviceResponse.status).json(serviceResponse.data);
}

async function newMatch(req: Request, res: Response): Promise<void> {
  const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
  const homeTeam = { homeTeamId, homeTeamGoals };
  const awayTeam = { awayTeamId, awayTeamGoals };
  const serviceResponse = await matchService
    .newMatch(homeTeam, awayTeam);
  res.status(serviceResponse.status).json(serviceResponse.data);
}

export default {
  getMatches,
  finishMatch,
  updatedMatch,
  newMatch,
};
