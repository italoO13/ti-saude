import type IPacient from '../../interfaces/IPacient'

export default interface IPacientService {
  create: (pacient: IPacient) => Promise<void>
  getAll: (userId: string) => Promise<IPacient[]>
  getPacient: (userId: string, pacientId: string) => Promise<IPacient | null >
}
