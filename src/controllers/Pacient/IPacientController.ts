import { type Request, type Response, type NextFunction } from 'express'

export default interface IPacientController {
  create: (res: Request, req: Response, next: NextFunction) => Promise<void>

}
