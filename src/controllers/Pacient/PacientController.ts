import { type Response, type NextFunction } from 'express'
import type IPacientController from './IPacientController'
import type IPacientService from '../../services/Pacient/IPacientService'
import type IRequestWithUser from '../../interfaces/IRequestWithUser'

export default class PacientController implements IPacientController {
  private readonly service: IPacientService

  constructor (service: IPacientService) {
    this.service = service
  }

  create = async (req: IRequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.user
      await this.service.create({ ...req.body, userId: id })
      res.status(201).json({ message: 'Created' })
    } catch (error) {
      next(error)
    }
  }
}
