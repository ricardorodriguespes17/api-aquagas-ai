import { Request, Response } from "express"

export type CustomerRequestType = Request<{}, CustomerResponseBodyType, {}, CustomerRequestBodyType>
export type CustomerResponseType = Response<CustomerResponseBodyType | ResponseErrorType>

type CustomerRequestBodyType = {
  customer_code: string
}

type CustomerResponseBodyType = {
  customer_code: string
  measures: {
    measure_uuid: string
    measure_datetime: string
    measure_type: string
    has_confirmed: boolean
    image_url: string
  }[]
}