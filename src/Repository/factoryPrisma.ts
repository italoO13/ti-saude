import { type PrismaClient } from '@prisma/client'
import { prismaClient } from '../database/prismaClient'
import type IUser from '../interfaces/IUser'
import type IPacient from '../interfaces/IPacient'

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

  public async findById (id: string): Promise<IUser | null> {
    const user = await this.model.user.findFirst({
      where: {
        id
      },
      select: {
        password: false,
        id: true,
        name: true,
        email: true,
        crm: true,
        created_at: true
      }
    })
    return user as unknown as IUser
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

  public async createPacient ({ email, phone, name, userId }: IPacient): Promise<void> {
    await this.model.pacient.create({
      data: {
        email,
        name,
        phone,
        userId
      }
    })
  }

  public async deleteOne (id: string): Promise<void> {
    await this.model.user.delete({
      where: {
        id
      }
    })
  }

  public async findUserByEmail (email: string): Promise<IUser | null > {
    const user = this.model.user.findFirst({
      where: {
        email
      }
    })
    return user as unknown as IUser
  }

  public async getPacientByEmail (email: string): Promise<IPacient | null > {
    const pacient = this.model.pacient.findFirst({
      where: {
        email
      }
    })
    return pacient as unknown as IPacient
  }

  public async getAllPacient (userId: string): Promise<IPacient[]> {
    const pacient = this.model.pacient.findMany({
      where: {
        userId
      }
    })
    return pacient as unknown as IPacient[]
  }

  public async getPacientId (id: string): Promise<IPacient | null > {
    const pacient = this.model.pacient.findFirst({
      where: {
        id
      }
    })
    return pacient as unknown as IPacient
  }

  public async deletePacientById (id: string): Promise<void > {
    await this.model.pacient.delete({
      where: {
        id
      }
    })
  }

  public async updatePacient ({ name, email, phone }: IPacient, id: string): Promise<void > {
    await this.model.pacient.update({
      data: {
        name,
        email,
        phone
      },
      where: {
        id
      }
    })
  }
}
