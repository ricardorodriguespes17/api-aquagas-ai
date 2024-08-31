import { Request, Response } from "express"
import * as Yup from 'yup'

const validationSchema = Yup.object({
  measure_uuid: Yup
    .string()
    .required("measure_uuid é obrigatório"),
  confirmed_value: Yup
    .number()
    .integer("confirmed_value deve ser um número inteiro")
    .required("confirmed_value é obrigatório"),
})

export const confirmValidation = async (req: Request, res: Response, next: Function) => {
  try {
    await validationSchema.validate(req.body)
    next()
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      res.status(400).json({
        error_code: "INVALID_DATA",
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