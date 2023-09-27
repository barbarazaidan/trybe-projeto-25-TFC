import { Router } from 'express';
import TeamsRouter from './TeamsRouter';

const router = Router();

router.use('/teams', TeamsRouter);

export default router;
