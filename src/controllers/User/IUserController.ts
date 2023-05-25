import { type Request, type Response, type NextFunction } from 'express'

export default interface IUserController {
  create: (res: Request, req: Response, next: NextFunction) => Promise<Response>
}
