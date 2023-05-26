import type IUser from '../../interfaces/IUser'
import type IUserModel from './IUserModel'
import { prismaClient } from '../../database/prismaClient'
import CustomError from '../../utils/customError'

export default class UserModel implements IUserModel {
  private readonly model = prismaClient

  private async validatedUser (email: string, crm: string): Promise<void> {
    const existingUser = await this.model.user.findFirst({
      where: {
        OR: [
          { email },
          { crm }
        ]
      }
    })
    if (existingUser != null) {
      throw new CustomError(404, 'Email ou crm já cadastrados !')
    }
  }

  async create (user: IUser): Promise<void> {
    const { email, crm, name, password } = user
    await this.validatedUser(email, crm)
    await this.model.user.create({
      data: {
        email,
        crm,
        name,
        password
      }
    })
  }
}
