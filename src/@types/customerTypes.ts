import { Request, Response } from "express"

export type CustomerRequestType = Request<CustomerRequestParamsType, CustomerResponseBodyType, {}, CustomerRequestQueryType>
export type CustomerResponseType = Response<CustomerResponseBodyType | ResponseErrorType>

type CustomerRequestParamsType = {
  customer_code: string
}

type CustomerRequestQueryType = {
  measure_type?: string
}

type CustomerResponseBodyType = {
  customer_code: string
  measures: {
    measure_uuid: string
    measure_datetime: Date
    measure_type: string
    has_confirmed: boolean
    image_url: string
  }[]
}