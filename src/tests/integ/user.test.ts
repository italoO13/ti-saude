import sinon from 'sinon'
import chai from 'chai'
import chaiHttp from 'chai-http'
import FactoryPrisma from '../../Repository/factoryPrisma'
import mocks from './mock'
import { app } from '../../index'

chai.use(chaiHttp)
const { expect } = chai

describe('Teste da rota User', () => {
  describe('/POST - Ao criar um novo usuário deve', () => {
    describe('Em caso de sucesso', () => {
      beforeEach(() => {
        sinon.stub(FactoryPrisma.prototype, 'getByEmailORCrm').resolves(null)
        sinon.stub(FactoryPrisma.prototype, 'createUser').resolves()
      })

      afterEach(() => {
        sinon.restore()
      })

      it('Deve criar um novo usuário e retornar status 201 com a mensagem created', async () => {
        const result = await chai.request(app).post('/users').send(mocks.user)
        expect(result.status).to.equal(201)
        expect(result.body).to.deep.equal({ message: 'Created' })
      })
    })

    describe('Em caso de falha', () => {
      beforeEach(() => {
        sinon.stub(FactoryPrisma.prototype, 'getByEmailORCrm').resolves(mocks.user)
        sinon.stub(FactoryPrisma.prototype, 'createUser').resolves()
      })

      afterEach(() => {
        sinon.restore()
      })

      it('Usuário já existe, deve retornar status 404 com a mensagem Email or CRM already registered!', async () => {
        const result = await chai.request(app).post('/users').send(mocks.user)
        expect(result.status).to.equal(404)
        expect(result.body).to.deep.equal({ message: 'Email or CRM already registered!' })
      })
    })

    describe('Caso de bad request', () => {
      it('Deve retornar status 400 caso a propriedade name seja null', async () => {
        const result = await chai.request(app).post('/users').send({ ...mocks.user, name: '' })
        expect(result.status).to.equal(400)
      })
      it('deve retornar status 401 caso email seja invalido', async () => {
        const result = await chai.request(app).post('/users').send({ ...mocks.user, email: 'emailinvalid.com' })
        expect(result.status).to.equal(401)
      })
      it('deve retornar status 422 caso password seja menor que 8 caracteres', async () => {
        const result = await chai.request(app).post('/users').send({ ...mocks.user, password: '1234567' })
        expect(result.status).to.equal(422)
      })
      it('deve retornar status 400 caso crm não seja informado', async () => {
        const result = await chai.request(app).post('/users').send({ ...mocks.user, crm: '' })
        expect(result.status).to.equal(400)
      })
    })
  })
})
