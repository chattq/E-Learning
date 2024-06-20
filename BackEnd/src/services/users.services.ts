import { config } from 'dotenv'
import userModel from '~/Models2/requests/users/users.models'
import { RegisterReqBody } from '~/Models2/requests/users/users.requests'
import { TokenType } from '~/constants/enums'
import Refresh_token from '~/models/refreshToken.models'
import User from '~/models/user.models'
import { hasPassword } from '~/utils/crypto'

import { signToken } from '~/utils/jwt'
import { useGetTime } from '~/utils/useGetTime'
const { getTimeMoment } = useGetTime()

config()

class UserService {
  private signAccessToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken
      },
      privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string,
      options: {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN
      }
    })
  }
  private signRefreshToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken
      },
      privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string,
      options: {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN
      }
    })
  }

  private signAccessAndRefreshToken(user_id: string) {
    return Promise.all([this.signAccessToken(user_id), this.signRefreshToken(user_id)])
  }
  async registerUser(payload: RegisterReqBody) {
    const { email, name, password } = payload
    const dataCreateUser = {
      user_id: email.toUpperCase(),
      user_name: name,
      user_email: email.toUpperCase(),
      user_password: hasPassword(password),
      user_create_at: getTimeMoment()
    }
    await User.create(dataCreateUser)
    const [Access_token, Refresh_tokens] = await this.signAccessAndRefreshToken(email)
    await Refresh_token.create({
      user_id: email,
      token: Refresh_tokens,
      create_at: getTimeMoment()
    })
    return {
      Access_token,
      Refresh_tokens
    }
  }
  async getUserByEmail(email: string) {
    const result = await userModel.findUserByEmail(email)
    return result // Return the result if successful
  }
  async login(user_id: string) {
    const [Access_token, Refresh_token] = await this.signAccessAndRefreshToken(user_id)
    await userModel.updateRefreshToken(user_id.toUpperCase(), Refresh_token)
    return {
      Access_token,
      Refresh_token
    }
  }
  async logout(user_id: string) {
    return await userModel.logoutQuery(user_id)
  }
}
const userService = new UserService()
export default userService
