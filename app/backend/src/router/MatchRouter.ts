import { Router } from 'express';

import matchController from '../controller/matchController';

const MatchesRouter = Router();

MatchesRouter.get('/', matchController.getMatches);

export default MatchesRouter;
