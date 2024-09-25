import { config } from 'dotenv'

import { TokenType } from '~/constants/enums'
import { RegisterReqBody } from '~/controllers/users.controllers'
import refresh_token from '~/models/refreshToken.models'
import user from '~/models/user.models'
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
    await user.create(dataCreateUser)
    const [Access_token, Refresh_tokens] = await this.signAccessAndRefreshToken(email)
    await refresh_token.create({
      user_id: email.toUpperCase(),
      token: Refresh_tokens,
      create_at: getTimeMoment()
    })
    return {
      Access_token,
      Refresh_tokens
    }
  }
  async login(user_id: string) {
    const [Access_token, Refresh_token] = await this.signAccessAndRefreshToken(user_id.toUpperCase())
    await refresh_token.update(
      { token: Refresh_token },
      {
        where: {
          user_id: user_id.toUpperCase()
        }
      }
    )
    return {
      Access_token,
      Refresh_token
    }
  }
  async logout(user_id: string) {
    // return await userModel.logoutQuery(user_id)
  }
  async getProfile(user_id: string) {
    return await user.findOne({
      where: {
        user_id: user_id.toUpperCase()
      }
    })
  }
}
const userService = new UserService()
export default userService
