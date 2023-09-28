import { NextFunction, Request, Response } from 'express';

async function validaLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  next();
}

export default validaLogin;
