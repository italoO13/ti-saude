import type ILoginService from '../../services/Login/ILoginService'
import type ILoginController from './ILoginController'
import { type Response, type Request, type NextFunction } from 'express'

export default class LoginController implements ILoginController {
  private readonly service: ILoginService

  constructor (service: ILoginService) {
    this.service = service
  }

  createSession = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body
      const result = await this.service.createSession(email, password)
      res.status(200).json({ token: result })
    } catch (error) {
      next(error)
    }
  }
}
