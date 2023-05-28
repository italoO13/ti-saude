/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import PacientModel from '../Repository/Pacient/PacientModel'
import PacientService from '../services/Pacient/PacientService'
import PacientController from '../controllers/Pacient/PacientController'
import Auth from '../middlewares/pacient.middleware'

const router = Router()
const pacientModel = new PacientModel()
const pacientService = new PacientService(pacientModel)
const pacientController = new PacientController(pacientService)
const pacientMiddeware = new Auth()

router.post('/', pacientMiddeware.authUser, pacientController.create)

export default router
