import { Router } from 'express'
import { UploadRequestType, UploadResponseType } from '../@types/uploadTypes'
import { uploadValidation } from '../validations/uploadValidation'
import uploadController from '../controller/uploadController'

const uploadRouter = Router()

uploadRouter.post("/upload", uploadValidation, uploadController.index)

export default uploadRouter