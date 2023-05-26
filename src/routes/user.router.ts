/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import UserModel from '../Repository/User/UserModel'
import UserService from '../services/User/UserService'
import UserController from '../controllers/User/UserController'
import UserMiddleware from '../middlewares/user.middleware'

const router = Router()
const userModel = new UserModel()
const userService = new UserService(userModel)
const userController = new UserController(userService)
const userMiddleware = new UserMiddleware()

router.post('/', userMiddleware.validateUser, userController.create)

export default router
