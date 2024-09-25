import express, { Request, Response, NextFunction } from 'express'
import userService from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { pick } from 'lodash'
import { USERS_MESSAGES } from '~/constants/messages-handle/users.messages'
import { ResultsReturned } from '~/utils/results-api'
import user from '~/models/user.models'
import { TokenType } from '~/constants/enums'
import { JwtPayload } from 'jsonwebtoken'

export interface RegisterReqBody {
  name?: string
  email: string
  password: string
  confirm_password?: string
  date_of_birth?: string
}

export interface TokenPayload extends JwtPayload {
  token_type: TokenType
  user_id: string
}

class UserController {
  async registerController(req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) {
    const { name, email, password } = req.body

    const result = await userService.registerUser({ name, email, password })
    return res.json(
      new ResultsReturned({
        isSuccess: true,
        message: 'Register successful',
        data: {
          user_id: email.toUpperCase(),
          result
        }
      })
    )
  }
  async loginController(req: Request, res: Response) {
    const { email, password } = req.body
    const result = await userService.login(email)
    const inforUser = await user.findOne({
      where: {
        user_email: email.toUpperCase()
      }
    })
    return res.json(
      new ResultsReturned({
        isSuccess: true,
        message: 'Login successful',
        data: {
          InforUser: {
            id: inforUser?.dataValues.user_id,
            email: inforUser?.dataValues.user_email,
            name: inforUser?.dataValues.user_name,
            avatar: inforUser?.dataValues.user_avatar
          },
          ...result
        }
      })
    )
  }
  async logoutController(req: Request, res: Response) {
    const user_id = req.decoded_authorization?.user_id
    await userService.logout(user_id as string)
    return res.json(
      new ResultsReturned({
        isSuccess: true,
        message: USERS_MESSAGES.LOGOUT_SUCCESS,
        data: null
      })
    )
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
    const userId = (req.decoded_authorization as TokenPayload).user_id
    const result = await userService.getProfile(userId)

    return res.json(
      new ResultsReturned({
        isSuccess: true,
        message: 'Get profile successfully',
        data: {
          id: result?.dataValues.user_id,
          email: result?.dataValues.user_email,
          name: result?.dataValues.user_name,
          avatar: result?.dataValues.user_avatar
        }
      })
    )
  }
}
const userController = new UserController()
export default userController
