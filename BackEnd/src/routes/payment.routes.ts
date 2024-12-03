import { Router } from 'express'
import { wrapRequestHandler } from '../utils/handlers'
import { accessTokenValidator } from 'src/middlewares/users.middlewares'
import cartController from 'src/controllers/cart.controllers'
import paymentController from 'src/controllers/payment.controllers'

const paymentRouter = Router()

paymentRouter.post('/addPayment', accessTokenValidator, wrapRequestHandler(paymentController.addToPayment))
paymentRouter.post('/GetListPayment', accessTokenValidator, wrapRequestHandler(paymentController.GetListPayment))

export default paymentRouter
