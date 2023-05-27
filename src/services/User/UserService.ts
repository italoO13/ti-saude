import type IUserModel from '../../Repository/User/IUserModel'
import type IUser from '../../interfaces/IUser'
import type IUserService from './IUserService'
import crypt from '../../utils/cryptPassword'

export default class UserService implements IUserService {
  private readonly _model: IUserModel

  constructor (model: IUserModel) {
    this._model = model
  }

  async create (user: IUser): Promise<void> {
    await this._model.create({ ...user, password: await crypt(user.password) })
  }

  async getUserById (id: string): Promise<IUser> {
    return await this._model.getUserById(id)
  }

  async deleteUser (id: string): Promise<boolean> {
    return await this._model.deleteUser(id)
  }
}
