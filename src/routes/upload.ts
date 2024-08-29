import { Router } from 'express'
import { UploadRequestType, UploadResponseType } from '../@types/uploadTypes'
import { uploadValidation } from '../validations/uploadValidation'

const uploadRouter = Router()

uploadRouter.post("/upload", uploadValidation, (req: UploadRequestType, res: UploadResponseType) => {
  const {
    customer_code,
    image,
    measure_datetime,
    measure_type
  } = req.body

  return res.status(200).json({
    image_url: "",
    measure_uuid: "",
    measure_value: 0
  })
})

export default uploadRouter