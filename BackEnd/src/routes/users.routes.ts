import { Router } from 'express'
import userController from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  emailVerifyTokenValidator,
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
  wrapRequestHandler(userController.logoutController)
)
/**
 * Description:
 * Path: /verify-email
 * Method: Post
 * Header:
 * Body: email_verify_token
 */
usersRouter.post('/verify-email', emailVerifyTokenValidator, wrapRequestHandler(userController.logoutController))

/**
 * Description: verify email when user client click on the link in email
 * Path: /resen-verify-email
 * Method: Post
 * Header: {Authorization: 'Bearer ' + <accessToken>}
 * Body: {}
 */
usersRouter.post('/resent-verify-email', accessTokenValidator, wrapRequestHandler(userController.logoutController))

/**
 * Description: get my profile
 * Path: /me
 * Method: Post
 * Header: {Authorization: 'Bearer ' + <accessToken>}
 */
usersRouter.post('/me', accessTokenValidator, wrapRequestHandler(userController.getMeController))

export default usersRouter
