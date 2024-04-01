import { Router } from 'express'
import userController from '~/controllers/users.controllers'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const usersRouter = Router()

usersRouter.post('/login', loginValidator, userController.loginController)
usersRouter.post('/register', registerValidator, wrapRequestHandler(userController.registerController))

export default usersRouter
