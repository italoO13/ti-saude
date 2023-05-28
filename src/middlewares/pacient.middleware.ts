import AuthJWT from '../utils/auth'
import { type Response, type NextFunction } from 'express'
import CustomError from '../utils/customError'
import type IRequestWithUser from '../interfaces/IRequestWithUser'

export default class Auth {
  constructor (private readonly auth = new AuthJWT()) {}

  public authUser = (req: IRequestWithUser, res: Response, next: NextFunction): void => {
    const { authorization } = req.headers
    if (authorization == null) {
      throw new CustomError(401, 'Token not found')
    }
    try {
      const decode = this.auth.verifyToken(authorization)
      req.user = decode
      next()
    } catch (error) {
      next(new CustomError(401, 'Token must be a valid token'))
    }
  }
}
