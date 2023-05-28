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
}
