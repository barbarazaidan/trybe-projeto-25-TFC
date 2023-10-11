import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeMatchModel from '../database/models/MatchModel';
import { 
    listaDePartidasDBTotal,
    listaDePartidasDBProgressFalse,
    listaDePartidasDBProgressTrue,
    listaDePartidasFindAll, 
    listaDePartidasInProgressFalse,
    listaDePartidasInProgressTrue,
    newMatchRetorno,
    newMatchBody,
} from '../mocks/matchesMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica as rotas de /matches', () => {
  beforeEach(function () { sinon.restore(); });
  it('Verifica se uma lista de partidas sem filtros é retornada', async function () {

    sinon.stub(SequelizeMatchModel, 'findAll').resolves(listaDePartidasDBTotal as any);

    const response = await chai.request(app).get('/matches');
    // console.log(response.body);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(listaDePartidasFindAll);
  });

  it('Verifica se ao utilizar a query inProgress=false, a lista de partidas finalizadas é retornada', async function () {

    sinon.stub(SequelizeMatchModel, 'findAll').resolves(listaDePartidasDBProgressFalse as any);

    const response = await chai.request(app).get('/matches?inProgress=false');
    // console.log(response.body);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(listaDePartidasInProgressFalse);
  });

  it('Verifica se ao utilizar a query inProgress=true, a lista de partidas em andamento é retornada', async function () {

    sinon.stub(SequelizeMatchModel, 'findAll').resolves(listaDePartidasDBProgressTrue as any);

    const response = await chai.request(app).get('/matches?inProgress=true');
    // console.log(response.body);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(listaDePartidasInProgressTrue);
  });

  it('Verifica se é possível inserir uma nova partida usando um token válido', async function () {

    sinon.stub(SequelizeMatchModel, 'create').resolves(newMatchRetorno as any);

    const tokenValido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE2OTYwODg5Njd9.Gs0w4pO0YHr49GK40dMzQlXSo89hj113Y6i7rYq86kY'

    const response = await chai.request(app).post('/matches').send(newMatchRetorno).set('authorization', tokenValido);
    // console.log(response.body);

    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal(newMatchRetorno);
  });

  it('Verifica se uma mensagem de erro aparece ao tentar inserir uma nova partida sem passar um token', async function () {
    const response = await chai.request(app).post('/matches').send(newMatchRetorno);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Token not found' });
  });

  it('Verifica se uma mensagem de erro aparece ao tentar inserir uma nova partida usando um token inválido', async function () {
    const response = await chai.request(app).post('/matches').send(newMatchRetorno).set('authorization', 'Bearer tokenInvalido');

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Token must be a valid token' });
  });
});
