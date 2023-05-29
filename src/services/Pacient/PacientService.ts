import type IPacientModel from '../../Repository/Pacient/IPacientModel'
import type IPacient from '../../interfaces/IPacient'
import type IPacientService from './IPacientService'

export default class PacientService implements IPacientService {
  private readonly _model: IPacientModel

  constructor (model: IPacientModel) {
    this._model = model
  }

  async create (pacient: IPacient): Promise<void> {
    await this._model.create(pacient)
  }

  async getAll (userId: string): Promise<IPacient[]> {
    const pacients = await this._model.getAll(userId)
    return pacients
  }

  async getPacient (userId: string, pacientId: string): Promise<IPacient | null> {
    const pacients = await this._model.getPacient(userId, pacientId)

    return pacients
  }

  async updatePacientById (userId: string, body: IPacient, pacientId: string): Promise<IPacient | null> {
    const pacient = await this._model.updatePacientById(userId, body, pacientId)
    return pacient
  }

  async delete (userId: string, pacientId: string): Promise<IPacient | null> {
    const pacient = await this._model.delete(userId, pacientId)
    return pacient
  }
}
