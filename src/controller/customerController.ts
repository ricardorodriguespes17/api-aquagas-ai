import { CustomerRequestType, CustomerResponseType } from "../@types/customerTypes"
import { MeasureType } from "../@types/measureTypes"
import measureRepository from "../repository/measureRepository"

const index = async (req: CustomerRequestType, res: CustomerResponseType) => {
  const { customer_code } = req.params
  const { measure_type } = req.query

  let measures: MeasureType[] = await measureRepository.findByCustomerCode({ customer_code })

  if (measure_type) {
    measures = measures.filter(item => item.type === measure_type)
  }

  if (measures.length === 0) {
    return res.status(404).json({
      error_code: "MEASURES_NOT_FOUND",
      error_description: "Nenhuma leitura encontrada"
    })
  }

  return res.status(200).json({
    customer_code,
    measures: measures.map(item => ({
      measure_uuid: item.uuid,
      measure_datetime: item.datetime,
      measure_type: item.type,
      has_confirmed: item.confirmed,
      image_url: item.image_url,
    }))
  })
}

export default {
  index
}