import type IUser from '../../interfaces/IUser'
import type IUserModel from './IUserModel'
import CustomError from '../../utils/customError'
import FactoryPrisma from '../factoryPrisma'

export default class UserModel extends FactoryPrisma implements IUserModel {
  private async validatedUser (email: string, crm: string): Promise<void> {
    const existingUser = await this.getByEmailORCrm(email, crm)

    if (existingUser != null) {
      throw new CustomError(404, 'Email or CRM already registered!')
    }
  }

  async create (user: IUser): Promise<void> {
    const { email, crm } = user
    await this.validatedUser(email, crm)
    await this.createUser(user)
  }

  async getUserById (id: string): Promise<IUser> {
    const user = await this.findById(id)
    if (user == null) {
      throw new CustomError(404, 'User not Found')
    }
    return user
  }

  async deleteUser (id: string): Promise<boolean> {
    const user = await this.findById(id)
    if (user == null) {
      throw new CustomError(404, 'User not Found')
    }
    await this.deleteOne(id)
    return true
  }
}
