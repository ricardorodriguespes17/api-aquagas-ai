import { Request, Response, Router } from 'express'
import confirmRouter from './confirm'
import customerRouter from './customer'
import uploadRouter from './upload'

const router = Router()

router.get("/", (req: Request, res: Response) => {
  return res.send("API AquaGas AI")
})

router.use(confirmRouter)
router.use(customerRouter)
router.use(uploadRouter)

export default router