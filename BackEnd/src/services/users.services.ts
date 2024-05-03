import { config } from 'dotenv'
import { TokenType } from '~/constants/enums'
import userModel from '~/models/requests/users/users.models'
import { RegisterReqBody } from '~/models/requests/users/users.requests'
import { signToken } from '~/utils/jwt'
import { useGetTime } from '~/utils/useGetTime'

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
    const { email } = payload
    await userModel.createUser(payload)
    const [Access_token, Refresh_token] = await this.signAccessAndRefreshToken(payload.email)
    await userModel.saveRefreshToken(email, Refresh_token)
    return {
      Access_token,
      Refresh_token
    }
  }
  async getUserByEmail(email: string) {
    const result = await userModel.findUserByEmail(email)
    return result // Return the result if successful
  }
  async login(user_id: string) {
    const [Access_token, Refresh_token] = await this.signAccessAndRefreshToken(user_id)
    await userModel.updateRefreshToken(user_id, Refresh_token)
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
