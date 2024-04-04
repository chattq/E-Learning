import { NextFunction, Request, Response } from 'express'
import formidable from 'formidable'
import path from 'path'
import mediasService from '~/services/media.services'

export const uploadSingleImageController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await mediasService.handleUploadSingleImage(req)

  return res.json({
    isSuccess: true,
    message: 'Upload successful',
    Data: result
  })
}
