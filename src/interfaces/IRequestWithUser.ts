import { type Request } from 'express'
import type IJWT from './IAuth'

export default interface IRequestWithUser extends Request {
  user: IJWT
}
