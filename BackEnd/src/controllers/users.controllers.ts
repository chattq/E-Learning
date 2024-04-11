import express, { Request, Response, NextFunction } from 'express'

import userService from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { pick } from 'lodash'

import { USERS_MESSAGES } from '~/constants/messages-handle/users.messages'
import { RegisterReqBody, userModelTypes } from '~/models/requests/users/users.requests'

class UserController {
  async registerController(req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) {
    const { name, email, password } = req.body

    const result = await userService.registerUser({ name, email, password })
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
    const inforUser = (await userService.getUserByEmail(email)) as userModelTypes[]

    return res.json({
      isSuccess: true,
      message: 'Login successful',
      data: {
        User: {
          id: inforUser[0].user_id,
          email: inforUser[0].user_email,
          name: inforUser[0].user_name,
          avatar: inforUser[0].user_avatar
        },
        ...result
      }
    })
  }
  async logoutController(req: Request, res: Response) {
    const user_id = req.decoded_authorization?.user_id
    await userService.logout(user_id as string)
    return res.json({
      isSuccess: true,
      message: USERS_MESSAGES.LOGOUT_SUCCESS,
      data: null
    })
  }
  async emailVerifyController(req: Request, res: Response) {
    const { email_verify_token } = req.body
    // const result = await userService.emailVerify(token)
    // return res.json({
    //   isSuccess: true,
    //   message: USERS_MESSAGES.EMAIL_VERIFY_TOKEN_IS_REQUIRED,
    //   data: result
    // })
  }
  async getMeController(req: Request, res: Response, next: NextFunction) {
    // console.log(req.decoded_authorization as TokenPayload)
  }
}
const userController = new UserController()
export default userController
