import { Router } from 'express';

import userController from '../controller/userController';
import validaLogin from '../middlewares/validaLogin';

const LoginRouter = Router();

LoginRouter.post('/', validaLogin, userController.doLogin);

export default LoginRouter;
