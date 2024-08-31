import { ConfirmRequestType, ConfirmResponseType } from "../@types/confirmTypes"
import measureRepository from "../repository/measureRepository"

const index = async (req: ConfirmRequestType, res: ConfirmResponseType) => {
  const {
    confirmed_value,
    measure_uuid
  } = req.body

  try {
    const measureData = await measureRepository.findByUuid({ uuid: measure_uuid })

    if (!measureData) {
      return res.status(404).json({
        error_code: "MEASURE_NOT_FOUND",
        error_description: "Leitura do mês já realizada"
      })
    }

    if (measureData.confirmed) {
      return res.status(409).json({
        error_code: "CONFIRMATION_DUPLICATE",
        error_description: "Leitura do mês já realizada"
      })
    }

    await measureRepository.update({
      ...measureData,
      value: confirmed_value,
      confirmed: true
    })

    return res.status(200).json({ success: true })
  } catch (err) {
    return res.status(500).json({
      error_code: "INTERNAL_ERROR",
      error_description: "Erro inesperado"
    })
  }
}

export default {
  index
}