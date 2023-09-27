import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import SequelizeTeamModel from '../database/models/TeamModel';
import { listaDeTimesFindAll, timeEspecifico } from '../mocks/teamsMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica as rotas de /teams', () => {
  beforeEach(function () { sinon.restore(); });
  it('Verifica se uma lista de times é retornada', async function () {
    sinon.stub(SequelizeTeamModel, 'findAll').resolves([
      SequelizeTeamModel.build({ "id": 1, "teamName": "Cruzeiro"}),
      SequelizeTeamModel.build({ "id": 2, "teamName": "Bahia"}),
      SequelizeTeamModel.build({ "id": 3, "teamName": "Botafogo"}),
    ]);

    const response = await chai.request(app).get('/teams');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(listaDeTimesFindAll);
  });

  // it('Verifica se um time específico é retornado corretamente', async function () {
  //   sinon.stub(SequelizeTeamModel, 'findByPk').resolves(
  //     SequelizeTeamModel.build({ "id": 3, "teamName": "Botafogo"}),
  //   );

  //   const response = await chai.request(app).get('/teams/3');

  //   expect(response.status).to.be.equal(200);
  //   expect(response.body).to.be.deep.equal(timeEspecifico);
  // });

  // it('Verifica se um time específico é retornado corretamente', async function () {
  //   sinon.stub(SequelizeTeamModel, 'findByPk').resolves(
  //     SequelizeTeamModel.build({ "id": 3, "teamName": "Botafogo"}),
  //   );

  //   const response = await chai.request(app).get('/teams/3');

  //   expect(response.status).to.be.equal(200);
  //   expect(response.body).to.be.deep.equal(timeEspecifico);
  // });
});
