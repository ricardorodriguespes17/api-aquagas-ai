import { UploadRequestType, UploadResponseType } from "../@types/uploadTypes";
import { generateContent } from "../services/meterService";
import measureRepository from "../repository/measureRepository"

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
    const measure_value = parseInt(measure)

    measureRepository.create({
      customer_code,
      datetime: new Date(measure_datetime),
      image_url: "",
      type: measure_type,
      value: measure_value
    })

    return res.status(200).json({
      image_url: "",
      measure_uuid: imageName,
      measure_value
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