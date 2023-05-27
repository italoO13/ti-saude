import { instance, mock, resetCalls, when } from 'ts-mockito'
import sinon from 'sinon'
import chai from 'chai'
import chaiHttp from 'chai-http'
import { prismaClient } from '../../database/prismaClient'
import mocks from './mock'
import { app } from '../../index'

chai.use(chaiHttp)
const { expect } = chai

describe('Teste da rota User', () => {
  describe('/POST - Ao criar um novo usuário deve', () => {
    let createUserStub: sinon.SinonStub
    describe('Em caso de sucesso', () => {
      beforeEach(() => {
        createUserStub = sinon.stub().resolves()
      })

      afterEach(() => {
        createUserStub.restore()
      })

      it('Deve criar um novo usuário e retornar status 201 com a mensagem created', async () => {
        sinon.replace(app.get('prismaClient').user, 'create', createUserStub)

        const result = await chai.request(app).post('/users').send(mocks.user)
        expect(result.status).to.equal(201)
        expect(result.body).to.deep.equal({ message: 'created' })
      })
    })
  })
})
