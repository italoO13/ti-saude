import type IPacient from '../../interfaces/IPacient'

export default interface IPacientService {
  create: (pacient: IPacient) => Promise<void>
}
