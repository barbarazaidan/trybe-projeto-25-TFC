import * as bcrypt from 'bcryptjs';

import SequelizeUserModel from '../database/models/UserModel';
import geraToken from '../utils/geraToken';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import RoleType from '../Interfaces/Role';



async function doLogin(email: string, password: string) {
  const user = await SequelizeUserModel.findOne({ where: { email } });
  // console.log(user);
  if (!user) {
    return { status: 401, data: { message: 'Invalid email or password' } };
  }

  // o bcrypt.compareSync(password, user.dataValues.password) compara a senha recebida no body com a senha criptografada do banco de dados
  if (!bcrypt.compareSync(password, user.dataValues.password)) {
    return { status: 401, data: { message: 'Invalid email or password' } };
  }

  const token = geraToken(user.dataValues.id, user.dataValues.role);

  return { status: 200, data: { token } };
}

async function getRole(id: number) : Promise<ServiceResponse<RoleType>> {
  const userData = await SequelizeUserModel.findOne({ where: { id } });
  // console.log(userData);
  if (!userData) {
    return { status: 404, data: { message: 'User not found' } };
  }
  const { role } = userData.dataValues;
  return { status: 200, data: { role } };
}

export default {
  doLogin,
  getRole,
};
