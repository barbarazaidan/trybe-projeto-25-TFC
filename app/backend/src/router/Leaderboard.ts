import { Router } from 'express';

import leaderBoardController from '../controller/leaderBoardController';
// import validaToken from '../middlewares/validaToken';

const LeaderBoardRouter = Router();

LeaderBoardRouter.get('/home', leaderBoardController.getLeaderHome);

export default LeaderBoardRouter;
