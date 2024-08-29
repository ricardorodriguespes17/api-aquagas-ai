import { Request, Response } from "express"
import * as Yup from 'yup'

const uploadSchema = Yup.object({
  image: Yup
    .string()
    .required("image é obrigatório")
    .matches(/^data:image\/(png|jpeg|jpg);base64,/, "image não compativel com o padrão base64"),
  measure_type: Yup
    .string()
    .required("measure_type é obrigatório")
    .oneOf(['WATER', 'GAS'], "measure_type deve ser 'WATER' ou 'GAS'"),
  customer_code: Yup
    .string()
    .required("customer_code é obrigatório"),
  measure_datetime: Yup
    .string()
    .required("measure_datetime é obrigatório")
    .matches(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z|([+\-]\d{2}:\d{2}))$/,
      "measure_datetime deve ser uma data e hora válida (YYYY-MM-DD)"
    )
})

export const uploadValidation = async (req: Request, res: Response, next: Function) => {
  try {
    await uploadSchema.validate(req.body)
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