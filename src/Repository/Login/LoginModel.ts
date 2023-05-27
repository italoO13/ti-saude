import type IUser from '../../interfaces/IUser'
import CustomError from '../../utils/customError'
import FactoryPrisma from '../factoryPrisma'
import type ILoginModel from './ILoginModel'

export default class LoginModel extends FactoryPrisma implements ILoginModel {
  async findOne (email: string): Promise<IUser> {
    const user = await this.findUserByEmail(email)
    if (user == null) {
      throw new CustomError(404, 'User not Found')
    }
    return user
  }
}
