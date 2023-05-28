import { Router } from 'express'
import userRouter from './user.router'
import loginRouter from './login.router'

const router = Router()
router.use('/users', userRouter)
router.use('/session', loginRouter)

export default router
