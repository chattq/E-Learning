import express, { Request, Response, NextFunction } from 'express'

import userService from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { pick } from 'lodash'

import { USERS_MESSAGES } from '~/constants/messages-handle/users.messages'
import { RegisterReqBody } from '~/models/requests/users/users.requests'

class UserController {
  async registerController(req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) {
    const { name, email, password, date_of_birth } = req.body

    const result = await userService.registerUser({ name, email, password, date_of_birth })
    return res.json({
      isSuccess: true,
      message: 'Register successful',
      data: {
        user_id: email.toUpperCase(),
        result
      }
    })
  }
  async loginController(req: Request, res: Response) {
    const { email, password } = req.body
    const result = await userService.login(email)
    const inforUser = (await userService.getUserByEmail(email)) as RegisterReqBody[]

    return res.json({
      isSuccess: true,
      message: 'Login successful',
      data: {
        User: pick(inforUser[0], ['id', 'email', 'name', 'avatar']),
        ...result
      }
    })
  }
  async logoutController(req: Request, res: Response) {
    const { refresh_token } = req.body

    // await userService.logout(refresh_token)
    return res.json({
      isSuccess: true,
      message: USERS_MESSAGES.LOGOUT_SUCCESS,
      data: null
    })
  }
  async getMeController(req: Request, res: Response, next: NextFunction) {
    // console.log(req.decoded_authorization as TokenPayload)
  }
}
const userController = new UserController()
export default userController
