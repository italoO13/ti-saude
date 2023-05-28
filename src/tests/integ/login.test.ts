import sinon from 'sinon'
import chai from 'chai'
import chaiHttp from 'chai-http'
import FactoryPrisma from '../../Repository/factoryPrisma'
import mocks from './mock'
import { app } from '../../index'
import bycrpt from '../../utils/cryptPassword'

chai.use(chaiHttp)
const { expect } = chai

describe('Testa a camada  de Login', () => {
  describe('/POST', () => {
    afterEach(() => {
      sinon.restore()
    })

    it('Deve logar um usuário com sucesso', async () => {
      sinon.stub(FactoryPrisma.prototype, 'findUserByEmail').resolves(mocks.user)
      sinon.stub(bycrpt, 'validatePassword').resolves(true)
      const result = await chai.request(app).post('/session').send(mocks.loginSucess)
      expect(result.status).to.equal(200)
      expect(result.body).to.be.property('token')
    })

    it('Deve retornar um erro com a menssagem "Incorrect email or password" e status 401 quando é passado um email invalido', async () => {
      sinon.stub(FactoryPrisma.prototype, 'findUserByEmail').resolves(null)
      sinon.stub(bycrpt, 'validatePassword').resolves(true)

      const result = await chai.request(app).post('/session').send({ ...mocks.loginSucess, email: 'emailinvalido.com' })
      expect(result.status).to.be.equal(404)
      expect(result.body).to.property('message')
      expect(result.body.message).to.equal('Incorrect email or password')
    })

    it('Deve retornar um erro com a menssagem "Incorrect email or password" e status 401 quando o password está incorreto', async () => {
      sinon.stub(FactoryPrisma.prototype, 'findUserByEmail').resolves(mocks.user)
      sinon.stub(bycrpt, 'validatePassword').resolves(false)
      const result = await chai.request(app).post('/session').send({ ...mocks.loginSucess, password: 'naoexiste' })
      expect(result.status).to.be.equal(401)
      expect(result.body).to.property('message')
      expect(result.body.message).to.equal('Incorrect email or password')
    })
  })
})
