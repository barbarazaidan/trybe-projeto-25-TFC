import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const extractToken = (token: string) => {
  const usableToken = token.split(' ')[1]; // aqui o split transforma em um array com dois elementos, sendo Bearer na posição 0 e o token na posição 1
  return usableToken;
};

const validaToken = (req: Request, res: Response, next: NextFunction) => {
  /*
    eu preciso envelopar tudo dentro do try catch, pois se a validação do verify mostrar que o token é inválido ou expirou, o JWT vai disparar um erro, fazendo a API quebrar
    */
  try {
    const { authorization: token } = req.headers;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const usableToken = extractToken(token);

    // eu posso não ter preenchido o JWT_SECRET no .env, então eu preciso de um valor default para o segredo
    const secret = process.env.JWT_SECRET || 'segredo';

    const decodedToken = jwt.verify(usableToken, secret);

    // coloquei as informações do usuário ({ id: 2, role: 'user', iat: 1696088967 }) dentro de uma nova chave criada no res e que chamei de payload
    res.locals.payload = decodedToken;
    // console.log(res.locals.payload);

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validaToken;
