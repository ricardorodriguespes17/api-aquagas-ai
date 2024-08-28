import { Request, Response, Router } from 'express'

const customerRouter = Router()

customerRouter.get("/:customer_code/list", (req: Request, res: Response) => {
  const customer_code = req.query.customer_code

  return res.status(200).json({
    customer_code,
    measures: []
  })
})

export default customerRouter