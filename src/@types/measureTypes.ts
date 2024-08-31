export type MeasureType = {
  uuid: string
  customer_code: string
  datetime: Date
  image_url: string
  value: number
  type: string
  confirmed: boolean
}

export type MeasureCreateType = Omit<MeasureType, "uuid">

export type MeasureUpdateType = MeasureType

export type MeasureFindByCustomerCode = {
  customer_code: string
}

export type MeasureFindByCustomerCodeAndMonth = {
  datetime: Date
} & MeasureFindByCustomerCode

export type MeasureFindByUuid = {
  uuid: string
}