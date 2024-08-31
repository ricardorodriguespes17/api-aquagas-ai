import { Router } from 'express'
import { customerValidation } from '../validations/customerValidation'
import customerController from '../controller/customerController'

const customerRouter = Router()

customerRouter.get("/:customer_code/list", customerValidation, customerController.index)

export default customerRouter