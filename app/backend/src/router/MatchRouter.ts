import { Router } from 'express';

import matchController from '../controller/matchController';
import validaToken from '../middlewares/validaToken';

const MatchesRouter = Router();

MatchesRouter.get('/', matchController.getMatches);
MatchesRouter.patch('/:id/finish', validaToken, matchController.finishMatch);

export default MatchesRouter;
