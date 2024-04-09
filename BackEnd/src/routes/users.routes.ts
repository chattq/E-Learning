import { Router } from 'express'
import userController from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const usersRouter = Router()

usersRouter.post('/login', loginValidator, wrapRequestHandler(userController.loginController))
usersRouter.post('/register', registerValidator, wrapRequestHandler(userController.registerController))
usersRouter.post(
  '/logout',
  accessTokenValidator,
  refreshTokenValidator,
  wrapRequestHandler((req, res) => {
    res.json({ message: 'User logged out' })
  })
)

/**
 * Description: get my profile
 * Path: /me
 * Method: Post
 * Header: {Authorization: 'Bearer ' + <accessToken>}
 */
usersRouter.post('/me', accessTokenValidator, wrapRequestHandler(userController.getMeController))

export default usersRouter
