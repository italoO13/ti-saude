import type IPacient from '../../interfaces/IPacient'

export default interface IPacientModel {
  create: (pacient: IPacient) => Promise<void>
}
