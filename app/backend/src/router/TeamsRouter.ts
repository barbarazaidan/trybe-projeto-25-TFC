import { Router } from 'express';

import teamsController from '../controller/teamsController';

const teamsRouter = Router();

teamsRouter.get('/', teamsController.getTeams);
teamsRouter.get('/:id', teamsController.getOneTeam);

export default teamsRouter;
