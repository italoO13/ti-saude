import type IPacient from '../../interfaces/IPacient'
import CustomError from '../../utils/customError'
import FactoryPrisma from '../factoryPrisma'
import type IPacientModel from './IPacientModel'

export default class PacientModel extends FactoryPrisma implements IPacientModel {
  private async validatedPacient (email: string): Promise<void> {
    const existingPacient = await this.getPacientByEmail(email)

    if (existingPacient != null) {
      throw new CustomError(404, 'Email already registered!')
    }
  }

  private async validatedUser (userId: string): Promise<void> {
    const user = await this.findById(userId)

    if (user == null) {
      throw new CustomError(404, 'User not exists')
    }
  }

  async create (pacient: IPacient): Promise<void> {
    const { email } = pacient
    await this.validatedPacient(email)
    await this.createPacient(pacient)
  }

  async getAll (userId: string): Promise<IPacient[]> {
    await this.validatedUser(userId)
    return await this.getAllPacient(userId)
  }

  async getPacient (userId: string, pacientId: string): Promise<IPacient | null> {
    await this.validatedUser(userId)
    return await this.getPacientId(pacientId)
  }

  async delete (userId: string, pacientId: string): Promise<IPacient> {
    await this.validatedUser(userId)

    const pacient = await this.getPacientId(pacientId)

    if (pacient == null) {
      throw new CustomError(404, 'Pacient not exists')
    }

    await this.deletePacientById(pacientId)
    return pacient
  }

  async updatePacientById (userId: string, body: IPacient, pacientId: string): Promise<IPacient | null > {
    await this.validatedUser(userId)
    const pacient = await this.getPacientId(pacientId)

    if (pacient == null) {
      throw new CustomError(404, 'Pacient not exists')
    }
    await this.updatePacient(body, pacientId)

    return await this.getPacientId(pacientId)
  }
}
