import { Request, Response } from 'express';
import userService from '../service/userService';

async function doLogin(req: Request, res: Response) {
  const { email, password } = req.body;
  const serviceResponse = await userService.doLogin(email, password);
  return res.status(serviceResponse.status).json(serviceResponse.data);
}

export default {
  doLogin,
};
