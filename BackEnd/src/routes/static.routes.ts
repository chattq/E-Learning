import { Router } from 'express'
import mediasController from '~/controllers/medias.controllers'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const staticRouter = Router()

// staticRouter.post('/uploadFiles/:name', mediasController.serveImageController)
// staticRouter.post('/uploadFiles/:name', mediasController.serveVideoController)

export default staticRouter
