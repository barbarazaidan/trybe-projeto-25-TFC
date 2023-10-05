import { Request, Response } from 'express';
import matchService from '../service/matchService';

// criei essa função para evitar os erros de compilação no TypeScript relacionados ao tipo de inProgress quando ele é undefined
// isso estava atrapalhando o matchService, pois o TypeScript não deixa eu passar undefined para o método getMatchesInProgress
const isInProgress = (inProgress: unknown) => {
  switch (inProgress) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return undefined;
  }
};

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

export default {
  getMatches,
};
