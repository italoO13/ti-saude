import type ILoginModel from '../../Repository/Login/ILoginModel'
import type ILoginService from './ILoginService'
import bycrpt from '../../utils/cryptPassword'
import CustomError from '../../utils/customError'
import AuthJWT from '../../utils/auth'

export default class LoginService implements ILoginService {
  constructor (private readonly _model: ILoginModel, private readonly auth = new AuthJWT()) {
  }

  async createSession (email: string, password: string): Promise<string> {
    const user = await this._model.findOne(email)
    const validatePass = await bycrpt.validatePassword(password, user.password)
    if (!validatePass) {
      throw new CustomError(401, 'Incorrect email or password')
    }
    const token = this.auth.generateToken({
      id: user.id,
      email: user.email,
      crm: user.crm
    })
    return token
  }
}
