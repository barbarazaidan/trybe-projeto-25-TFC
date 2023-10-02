import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeUserModel from '../database/models/UserModel';
import { bodyComEmailInexistente, bodyComEmailInvalido, bodyComPasswordInexistente, bodyComSenhaInvalida, bodySemEmail, bodySemSenha, bodyValido, user } from '../mocks/userMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica a rota de /login/role', () => {
  beforeEach(function () { sinon.restore(); });

  it('Verifica se o usuário recebe o retorno correto da rota /login/role ao passar um token válido', async function () {
    const tokenValido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE2OTYwODg5Njd9.Gs0w4pO0YHr49GK40dMzQlXSo89hj113Y6i7rYq86kY'
    sinon.stub(SequelizeUserModel, 'findOne').resolves(
      SequelizeUserModel.build(user));

    const response = (await chai.request(app).get('/login/role').set('authorization', tokenValido));

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.equal('user');
  });

  it('Verifica se uma mensagem de erro é retornada ao entrar na /login/role usando um token com um email inválido', async function () {
    const tokenValido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE2OTYwODg5Njd9.Gs0w4pO0YHr49GK40dMzQlXSo89hj113Y6i7rYq86kY'
    sinon.stub(SequelizeUserModel, 'findOne').resolves(null);

    const response = (await chai.request(app).get('/login/role').set('authorization', tokenValido));

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'User not found' });
  });


  it('Verifica se uma mensagem de erro é retornada ao entrar na /login/role sem passar um token', async function () {
    const response = (await chai.request(app).get('/login/role'));

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Token not found' });
  });

  it('Verifica se uma mensagem de erro é retornada ao entrar na /login/role com um token inválido', async function () {
    const response = ((await chai.request(app).get('/login/role').set('authorization', 'Bearer tokenInvalido')));

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Token must be a valid token' });
  });

  it('Verifica se uma mensagem de erro é retornada quando o email não existe no BD', async function () {
    sinon.stub(SequelizeUserModel, 'findOne').resolves(null);

    const response = (await chai.request(app).post('/login').send(bodyComEmailInexistente));

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });
});
