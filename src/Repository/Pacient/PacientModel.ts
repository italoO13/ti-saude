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

  async create (pacient: IPacient): Promise<void> {
    const { email } = pacient
    await this.validatedPacient(email)
    await this.createPacient(pacient)
  }

  async getAll (userId: string): Promise<IPacient[]> {
    const user = await this.findById(userId)

    if (user == null) {
      throw new CustomError(404, 'User not exists')
    }

    return await this.getAllPacient(userId)
  }

  async getPacient (userId: string, pacientId: string): Promise<IPacient | null> {
    const user = await this.findById(userId)

    if (user == null) {
      throw new CustomError(404, 'User not exists')
    }

    return await this.getPacientId(pacientId)
  }
}
