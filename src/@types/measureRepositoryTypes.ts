export type MeasureCreateType = {
  customer_code: string
  datetime: Date
  image_url: string
  value: number
  type: string
}

export type MeasureUpdateType = {
  uuid: string
} & MeasureCreateType

export type MeasureFindByCustomerCode = {
  customer_code: string
}

export type MeasureFindByCustomerCodeAndMonth = {
  datetime: Date
} & MeasureFindByCustomerCode

export type MeasureFindByUuid = {
  uuid: string
}