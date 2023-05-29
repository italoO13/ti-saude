import { type Request, type Response, type NextFunction } from 'express'

export default interface IPacientController {
  create: (res: Request, req: Response, next: NextFunction) => Promise<void>
  getALl: (res: Request, req: Response, next: NextFunction) => Promise<void>
  getPacient: (res: Request, req: Response, next: NextFunction) => Promise<void>
  updatePacientById: (res: Request, req: Response, next: NextFunction) => Promise<void>
  delete: (res: Request, req: Response, next: NextFunction) => Promise<void>
}
