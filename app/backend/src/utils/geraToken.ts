import * as jwt from 'jsonwebtoken';

const geraToken = (id: number, role:string) : string => {
  const payload = { id, role };
  const segredoToken = process.env.JWT_SECRET || 'segredo';
  const token = jwt.sign(payload, segredoToken);

  return token;
};

export default geraToken;
