import { Router } from 'express'
import confirmController from '../controller/confirmController'
import { confirmValidation } from '../validations/confirmValidation'

const confirmRouter = Router()

confirmRouter.post("/confirm", confirmValidation, confirmController.index)

export default confirmRouter