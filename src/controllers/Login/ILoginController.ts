import { type Request, type Response, type NextFunction } from 'express'

export default interface ILoginController {
  createSession: (res: Request, req: Response, next: NextFunction) => Promise<void>

}
