import { Request, Response, Router } from 'express'

const confirmRouter = Router()

confirmRouter.post("/confirm", (req: Request, res: Response) => {
  return res.status(200).json({ success: true })
})

export default confirmRouter