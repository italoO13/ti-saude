/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import UserModel from '../Repository/User/UserModel'
import UserService from '../services/User/UserService'
import UserController from '../controllers/User/UserController'

const router = Router()
const userModel = new UserModel()
const userService = new UserService(userModel)
const userController = new UserController(userService)

router.post('/', userController.create)

export default router
