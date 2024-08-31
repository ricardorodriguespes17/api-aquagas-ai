import { Request, Response } from "express"

export type ConfirmRequestType = Request<{}, ConfirmResponseBodyType, ConfirmRequestBodyType>
export type ConfirmResponseType = Response<ConfirmResponseBodyType | ResponseErrorType>

type ConfirmRequestBodyType = {
  measure_uuid: string
  confirmed_value: number
}

type ConfirmResponseBodyType = {
  success: true,
}