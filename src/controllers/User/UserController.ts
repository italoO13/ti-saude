import { type Request, type Response, type NextFunction } from 'express'
import type IUserController from './IUserController'
import type IUserService from '../../services/User/IUserService'

export default class UserController implements IUserController {
  private readonly service: IUserService

  constructor (service: IUserService) {
    this.service = service
  }

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.service.create(req.body)
      res.status(201).json({ message: 'Created' })
    } catch (error) {
      next(error)
    }
  }
}
