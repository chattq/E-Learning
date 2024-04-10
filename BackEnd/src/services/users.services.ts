import { config } from 'dotenv'
import { TokenType } from '~/constants/enums'
import userModel from '~/models/requests/users/users.models'
import { RegisterReqBody } from '~/models/requests/users/users.requests'

import { signToken } from '~/utils/jwt'
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
    // lưu  Refresh_token vào db ====> chưa làm trên db
    return {
      Access_token,
      Refresh_token
    }
  }
  async logout(refresh_token: string) {
    await userModel.logout(refresh_token)
  }
}
const userService = new UserService()
export default userService
