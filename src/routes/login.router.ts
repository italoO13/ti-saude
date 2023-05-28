/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import LoginModel from '../Repository/Login/LoginModel'
import LoginService from '../services/Login/LoginService'
import LoginController from '../controllers/Login/LoginController'

const router = Router()
const loginModel = new LoginModel()
const loginService = new LoginService(loginModel)
const loginController = new LoginController(loginService)

router.post('/', loginController.createSession)

export default router
