import { UploadRequestType, UploadResponseType } from "../@types/uploadTypes";
import { uploadImage } from "../services/meterService";

const index = async (req: UploadRequestType, res: UploadResponseType) => {
  const {
    customer_code,
    image,
    measure_datetime,
    measure_type
  } = req.body

  const imageName = `${customer_code}-${measure_datetime}`
  const response = await uploadImage(image, imageName)

  if (response.file) {
    return res.status(200).json({
      image_url: response.file.uri,
      measure_uuid: imageName,
      measure_value: 0
    })
  }

  return res.status(400).json({
    error_code: "INTERNAL_ERROR",
    error_description: response.error
  })
}

export default {
  index
}