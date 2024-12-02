import { Router } from 'express'
import { wrapRequestHandler } from '../utils/handlers'
import { accessTokenValidator } from 'src/middlewares/users.middlewares'
import cartController from 'src/controllers/cart.controllers'

const paymentRouter = Router()

paymentRouter.post('/addPayment', accessTokenValidator, wrapRequestHandler(cartController.addToCart))

export default paymentRouter
