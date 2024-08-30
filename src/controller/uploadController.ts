import { UploadRequestType, UploadResponseType } from "../@types/uploadTypes";
import { generateContent } from "../services/meterService";

const index = async (req: UploadRequestType, res: UploadResponseType) => {
  const {
    customer_code,
    image,
    measure_datetime,
    measure_type
  } = req.body

  const imageName = `${customer_code}-${measure_datetime}`

  try {
    const response = await generateContent(image, measure_type)

    const { measure } = JSON.parse(response) as { measure: string }

    return res.status(200).json({
      image_url: "",
      measure_uuid: imageName,
      measure_value: parseInt(measure)
    })
  } catch (err) {
    return res.status(500).json({
      error_code: "INTERNAL_ERROR",
      error_description: String(err)
    })
  }
}

export default {
  index
}