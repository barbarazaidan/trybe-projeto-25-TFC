import { NextFunction, Request, Response } from 'express';

const validaEmail = (email: string) => {
  const emailValido = /\S+@+\w+\.+[c]+[o]+[m]/;
  const isEmailValido = emailValido.test(email);
  return isEmailValido;
};

async function validaLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (!validaEmail(email)) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  next();
}

export default validaLogin;
