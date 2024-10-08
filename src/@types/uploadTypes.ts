import { Request, Response } from "express"

export type UploadRequestType = Request<{}, UploadResponseBodyType, UploadRequestBodyType>
export type UploadResponseType = Response<UploadResponseBodyType | ResponseErrorType>

type UploadRequestBodyType = {
  image: string,
  customer_code: string,
  measure_datetime: string,
  measure_type: "WATER" | "GAS"
}

type UploadResponseBodyType = {
  image_url: string,
  measure_value: number,
  measure_uuid: string
}