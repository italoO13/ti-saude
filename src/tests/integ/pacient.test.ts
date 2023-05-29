import sinon from 'sinon'
import chai from 'chai'
import chaiHttp from 'chai-http'
import FactoryPrisma from '../../Repository/factoryPrisma'
import mocks from './mock'
import { app } from '../../index'
import auth from '../../utils/auth'
import type IPacient from '../../interfaces/IPacient'

chai.use(chaiHttp)
const { expect } = chai

describe('Teste da rota Pacients', () => {
  describe('/POST - Ao criar um novo pacient deve', () => {
    describe('Em caso de sucesso', () => {
      beforeEach(() => {
        sinon.stub(FactoryPrisma.prototype, 'getPacientByEmail').resolves(null)
        sinon.stub(FactoryPrisma.prototype, 'createPacient').resolves()
        sinon.stub(auth.prototype, 'verifyToken').resolves({
          id: '4940427b-cd40-4d4b-b848-f9acd54a3d00',
          email: mocks.loginSucess.email
        })
      })

      afterEach(() => {
        sinon.restore()
      })

      it('Deve criar um novo paciente e retornar status 201 com a mensagem created', async () => {
        const result = await chai.request(app).post('/pacients').send(mocks.pacient)
          .set('authorization', mocks.token)
        expect(result.status).to.equal(201)
        expect(result.body).to.deep.equal({ message: 'Created' })
      })
    })

    describe('Em caso de falha', () => {
      beforeEach(() => {
        sinon.stub(FactoryPrisma.prototype, 'getPacientByEmail').resolves(null)
        sinon.stub(FactoryPrisma.prototype, 'createPacient').resolves()
      })
      afterEach(() => {
        sinon.restore()
      })

      it('Retorna status 401 quando Usuário possui token invalido com msg Token must be a valid token', async () => {
        const result = await chai.request(app).post('/pacients').send(mocks.pacient)
          .set('authorization', 'token invalido')
        expect(result.status).to.equal(401)
        expect(result.body).to.deep.equal({ message: 'Token must be a valid token' })
      })
      it('Retorna status 401 quando Usuário não informa token e mensagem Token not found', async () => {
        const result = await chai.request(app).post('/pacients').send(mocks.pacient)
        expect(result.status).to.equal(401)
        expect(result.body).to.deep.equal({ message: 'Token not found' })
      })
    })
  })
  describe('/GET - Ao pesquisar todos os pacients', () => {
    describe('Em caso de sucesso', () => {
      beforeEach(() => {
        sinon.stub(FactoryPrisma.prototype, 'getAllPacient').resolves(mocks.allPacients as unknown as IPacient[])
        sinon.stub(FactoryPrisma.prototype, 'findById').resolves(mocks.user)
        sinon.stub(auth.prototype, 'verifyToken').resolves({
          id: '4940427b-cd40-4d4b-b848-f9acd54a3d00',
          email: mocks.loginSucess.email
        })
      })

      afterEach(() => {
        sinon.restore()
      })

      it('Deve retornar todos os pacients do user em mocks.user com status 200 e body igual a mocks.allpacients', async () => {
        const result = await chai.request(app).get('/pacients')
          .set('authorization', mocks.token)
        expect(result.status).to.equal(200)
        expect(result.body).to.deep.equal(mocks.allPacients)
      })
    })

    describe('Em caso de falha', () => {
      beforeEach(() => {
        sinon.stub(FactoryPrisma.prototype, 'getAllPacient').resolves([])
        sinon.stub(FactoryPrisma.prototype, 'findById').resolves(null)
        sinon.stub(auth.prototype, 'verifyToken').resolves({
          id: '4940427b-cd40-4d4b-b848-f9acd54a3d00',
          email: mocks.loginSucess.email
        })
      })
      afterEach(() => {
        sinon.restore()
      })

      it('Retorna status 404 quando usuário não é encontrado', async () => {
        const result = await chai.request(app).get('/pacients')
          .set('authorization', mocks.token)
        expect(result.status).to.equal(404)
        expect(result.body).to.deep.equal({ message: 'User not exists' })
      })
    })
  })
  describe('/GET/:PacientId - Ao pesquisar um unico pacients', () => {
    describe('Em caso de sucesso', () => {
      beforeEach(() => {
        sinon.stub(FactoryPrisma.prototype, 'getPacientId').resolves(mocks.pacient as unknown as IPacient)
        sinon.stub(FactoryPrisma.prototype, 'findById').resolves(mocks.user)
        sinon.stub(auth.prototype, 'verifyToken').resolves({
          id: '4940427b-cd40-4d4b-b848-f9acd54a3d00',
          email: mocks.loginSucess.email
        })
      })

      afterEach(() => {
        sinon.restore()
      })

      it('Deve retornar um pacient do user em mocks.user com status 200 e body igual a mocks.pacient', async () => {
        const result = await chai.request(app).get('/pacients/1')
          .set('authorization', mocks.token)
        expect(result.status).to.equal(200)
        expect(result.body).to.deep.equal(mocks.pacient)
      })
    })

    describe('Em caso de falha', () => {
      beforeEach(() => {
        sinon.stub(FactoryPrisma.prototype, 'findById').resolves(null)
        sinon.stub(auth.prototype, 'verifyToken').resolves({
          id: '4940427b-cd40-4d4b-b848-f9acd54a3d00',
          email: mocks.loginSucess.email
        })
      })
      afterEach(() => {
        sinon.restore()
      })

      it('Retorna status 404 quando usuário não é encontrado', async () => {
        const result = await chai.request(app).get('/pacients/1')
          .set('authorization', mocks.token)
        expect(result.status).to.equal(404)
        expect(result.body).to.deep.equal({ message: 'User not exists' })
      })
    })
  })

  describe('/UPDATE - Atualiza um pacient', () => {
    describe('Em caso de sucesso', () => {
      beforeEach(() => {
        sinon.stub(FactoryPrisma.prototype, 'findById').resolves(mocks.user)
        sinon.stub(FactoryPrisma.prototype, 'updatePacient').resolves()
        sinon.stub(FactoryPrisma.prototype, 'getPacientId').resolves(mocks.pacient as unknown as IPacient)
        sinon.stub(auth.prototype, 'verifyToken').resolves({
          id: '4940427b-cd40-4d4b-b848-f9acd54a3d00',
          email: mocks.loginSucess.email
        })
      })

      afterEach(() => {
        sinon.restore()
      })

      it('Deve atualizar um paciente e retornar status 201 com um response igual ao mocks.pacient', async () => {
        const result = await chai.request(app).put('/pacients/1').send(mocks.pacient)
          .set('authorization', mocks.token)
        expect(result.status).to.equal(201)
        expect(result.body).to.deep.equal(mocks.pacient)
      })
    })

    describe('Em caso de falha', () => {
      beforeEach(() => {
        sinon.stub(FactoryPrisma.prototype, 'updatePacient').resolves()
      })
      afterEach(() => {
        sinon.restore()
      })

      it('Retorna status 404 quando pacient não existe', async () => {
        sinon.stub(FactoryPrisma.prototype, 'getPacientId').resolves()
        const result = await chai.request(app).put('/pacients/1').send(mocks.pacient)
          .set('authorization', mocks.token)
        expect(result.status).to.equal(404)
        expect(result.body).to.deep.equal({ message: 'Pacient not exists' })
      })
    })
  })
})
