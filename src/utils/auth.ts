import jwt from 'jsonwebtoken'
import 'dotenv'
import type IJWT from '../interfaces/IAuth'

export default class AuthJWT {
  private readonly config: jwt.SignOptions
  private readonly secret: jwt.Secret

  constructor () {
    this.config = {
      expiresIn: '1d',
      algorithm: 'HS256'
    }
    this.secret = process.env.JWT_SECRET ?? 'secret'
  }

  generateToken (payload: object): string {
    const token = jwt.sign(
      { ...payload }, this.secret,
      { expiresIn: this.config.expiresIn, algorithm: this.config.algorithm }
    )
    return token
  }

  verifyToken (token: string): IJWT {
    return jwt.verify(token, this.secret) as IJWT
  }
}
