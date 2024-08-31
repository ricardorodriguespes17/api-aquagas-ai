import { Request, Response } from "express"

export type ConfirmRequestType = Request<{}, ConfirmResponseBodyType, ConfirmRequestBodyType>
export type ConfirmResponseType = Response<ConfirmResponseBodyType | ConfirmResponseErrorType>

type ConfirmRequestBodyType = {
  measure_uuid: string
  confirmed_value: number
}

type ConfirmResponseBodyType = {
  success: true,
}

type ConfirmResponseErrorType = {
  error_code: string
  error_description: string
}