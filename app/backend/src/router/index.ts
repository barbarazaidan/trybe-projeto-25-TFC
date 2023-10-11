import { Router } from 'express';
import TeamsRouter from './TeamsRouter';
import LoginRouter from './LoginRouter';
import MatchesRouter from './MatchRouter';
import LeaderBoardRouter from './Leaderboard';

const router = Router();

router.use('/teams', TeamsRouter);
router.use('/login', LoginRouter);
router.use('/matches', MatchesRouter);
router.use('/leaderboard', LeaderBoardRouter);

export default router;
