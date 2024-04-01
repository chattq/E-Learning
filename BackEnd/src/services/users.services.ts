import { config } from 'dotenv'
import { TokenType } from '~/constants/enums'

import userModel, { RegisterReqBody } from '~/models/requests/users/users.models'
import { signToken } from '~/utils/jwt'
config()

class UserService {
  private signAccessToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken
      },
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
      options: {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN
      }
    })
  }

  private signAccessAndRefreshToken(user_id: string) {
    return Promise.all([this.signAccessToken(user_id), this.signRefreshToken(user_id)])
  }
  async registerUser(payload: RegisterReqBody) {
    await userModel.createUser(payload)
    const [Access_token, Refresh_token] = await this.signAccessAndRefreshToken(payload.email)
    return {
      Access_token,
      Refresh_token
    }
  }
  async getUserByEmail(email: string) {
    const result = await userModel.getUserByEmail(email)
    return result // Return the result if successful
  }
  async login(user_id: string) {
    const [Access_token, Refresh_token] = await this.signAccessAndRefreshToken(user_id)
    return {
      Access_token,
      Refresh_token
    }
  }
}
const userService = new UserService()
export default userService
