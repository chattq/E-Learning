import { Router } from 'express'
import mediasController from 'src/controllers/medias.controllers'
import { wrapRequestHandler } from 'src/utils/handlers'

const mediasRouter = Router()

mediasRouter.post(
  '/upload-images',
  // accessTokenValidator,
  wrapRequestHandler(mediasController.uploadSingleImageController)
)
// mediasRouter.post('/upload-videos', accessTokenValidator, wrapRequestHandler(mediasController.uploadVideoController))

export default mediasRouter
