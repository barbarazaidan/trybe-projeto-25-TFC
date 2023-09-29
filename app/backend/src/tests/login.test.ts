import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeUserModel from '../database/models/UserModel';
import { bodyComEmailInexistente, bodyComEmailInvalido, bodyComPasswordInexistente, bodyComSenhaInvalida, bodySemEmail, bodySemSenha, bodyValido, user } from '../mocks/userMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica a rota de /login', () => {
  beforeEach(function () { sinon.restore(); });
  it('Verifica se um token é retornado quando tudo está correto', async function () {
    sinon.stub(SequelizeUserModel, 'findOne').resolves(
      SequelizeUserModel.build({
        id: 2, username: 'User', role: 'user',
        email: 'user@user.com',
        password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
      }));

    const response = (await chai.request(app).post('/login').send(bodyValido));

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.haveOwnProperty('token');
  });

  it('Verifica se uma mensagem de erro é retornada quando o usuário não passa um email', async function () {

    const response = (await chai.request(app).post('/login').send(bodySemEmail));

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('Verifica se uma mensagem de erro é retornada quando o usuário não passa uma senha', async function () {

    const response = (await chai.request(app).post('/login').send(bodySemSenha));

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('Verifica se uma mensagem de erro é retornada quando o usuário não passa um email inválido', async function () {

    const response = (await chai.request(app).post('/login').send(bodyComEmailInvalido));

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('Verifica se uma mensagem de erro é retornada quando o usuário não passa uma senha com menos de 6 caracteres', async function () {

    const response = (await chai.request(app).post('/login').send(bodyComSenhaInvalida));

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('Verifica se uma mensagem de erro é retornada quando o email não existe no BD', async function () {
    sinon.stub(SequelizeUserModel, 'findOne').resolves(null);

    const response = (await chai.request(app).post('/login').send(bodyComEmailInexistente));

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('Verifica se uma mensagem de erro é retornada quando a senha passada não existe no BD', async function () {
    sinon.stub(SequelizeUserModel, 'findOne').resolves(
      SequelizeUserModel.build(user)
    );

    const response = (await chai.request(app).post('/login').send(bodyComPasswordInexistente));

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });
});
