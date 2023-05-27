import { type PrismaClient } from '@prisma/client'
import { prismaClient } from '../database/prismaClient'
import type IUser from '../interfaces/IUser'

export default class FactoryPrisma {
  private readonly model: PrismaClient

  constructor (model: PrismaClient = prismaClient) {
    this.model = model
  }

  public async getByEmailORCrm (email: string, crm: string): Promise<IUser | null> {
    const existingUser = await this.model.user.findFirst({
      where: {
        OR: [
          { email },
          { crm }
        ]
      }
    })
    return existingUser as unknown as IUser
  }

  public async createUser ({ email, crm, name, password }: IUser): Promise<void> {
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
