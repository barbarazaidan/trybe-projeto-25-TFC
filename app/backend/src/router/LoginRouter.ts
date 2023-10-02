import { Router } from 'express';

import userController from '../controller/userController';
import validaLogin from '../middlewares/validaLogin';
import validaToken from '../middlewares/validaToken';

const LoginRouter = Router();

LoginRouter.post('/', validaLogin, userController.doLogin);
LoginRouter.get('/role', validaToken, userController.getRole);

export default LoginRouter;
