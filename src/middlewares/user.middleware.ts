import { type Request, type Response, type NextFunction } from 'express'
import CustomError from '../utils/customError'
import userSchema from './schemaValidators/userValidators'

export default class UserMiddleware {
  private readonly schema = userSchema

  validateUser = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = this.schema.validate(req.body)
    if (error != null) {
      const [code, message] = error.message.split('|')
      next(new CustomError(Number(code), message))
    }
    next()
  }
}
