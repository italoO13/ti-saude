import { Router } from 'express'
import userRouter from './user.router'
import loginRouter from './login.router'
import pacientRouter from './pacient.router'

const router = Router()
router.use('/users', userRouter)
router.use('/session', loginRouter)
router.use('/pacients', pacientRouter)

export default router
