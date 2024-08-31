import { Request, Response } from "express"
import * as Yup from 'yup'

const validationParamsSchema = Yup.object({
  measure_type: Yup
    .string()
    .oneOf(['WATER', 'GAS', undefined], "Tipo de medição não permitida"),
})

export const customerValidation = async (req: Request, res: Response, next: Function) => {
  try {
    await validationParamsSchema.validate(req.query)
    next()
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      res.status(400).json({
        error_code: "INVALID_TYPE",
        error_description: error.errors.join(", ")
      })
    } else {
      res.status(500).json({
        error_code: "INVALID_DATA",
        error_description: "Internal Server Error"
      })
    }
  }
}