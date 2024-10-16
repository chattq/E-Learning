import { config } from 'dotenv'

import { TokenType, UserVerifyStatus } from '~/constants/enums'
import { RegisterReqBody } from '~/controllers/users.controllers'
import refresh_token from '~/models/refreshToken.models'
import user from '~/models/user.models'
import { hasPassword } from '~/utils/crypto'
import { sendVerifyRegisterEmail } from '~/utils/email'

import { signToken, verifyToken } from '~/utils/jwt'
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
  private signEmailVerifyToken({ user_id, verify }: { user_id: string; verify: UserVerifyStatus }) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.EmailVerifyToken,
        verify
      },
      privateKey: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string,
      options: {
        expiresIn: process.env.EMAIL_VERIFY_TOKEN_EXPIRES_IN
      }
    })
  }
  private decodeRefreshToken(refresh_token: string) {
    return verifyToken({
      token: refresh_token,
      secretOrPublickey: process.env.JWT_SECRET_REFRESH_TOKEN! as string
    })
  }

  private signAccessAndRefreshToken(user_id: string) {
    return Promise.all([this.signAccessToken(user_id), this.signRefreshToken(user_id)])
  }
  async registerUser(payload: RegisterReqBody) {
    const { email, name, password } = payload
    const email_verify_token = await this.signEmailVerifyToken({
      user_id: email.toUpperCase(),
      verify: UserVerifyStatus.Unverified
    })
    const dataCreateUser = {
      user_id: email.toUpperCase(),
      user_name: name,
      user_email: email.toUpperCase(),
      user_password: hasPassword(password),
      user_create_at: getTimeMoment(),
      email_verify_token: email_verify_token
    }
    await user.create(dataCreateUser)
    const [Access_token, Refresh_tokens] = await this.signAccessAndRefreshToken(email)
    await refresh_token.create({
      user_id: email.toUpperCase(),
      token: Refresh_tokens,
      create_at: getTimeMoment()
    })
    // await sendVerifyRegisterEmail(payload.email, email_verify_token)
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
  async verifyEmail(user_id: string) {
    // // Tạo giá trị cập nhật
    // // MongoDB cập nhật giá trị
    // const [token] = await Promise.all([
    //   this.signAccessAndRefreshToken({ user_id, verify: UserVerifyStatus.Verified }),
    //   databaseService.users.updateOne({ _id: new ObjectId(user_id) }, [
    //     {
    //       $set: {
    //         email_verify_token: '',
    //         verify: UserVerifyStatus.Verified,
    //         updated_at: '$$NOW'
    //       }
    //     }
    //   ])
    // ])
    // const [access_token, refresh_token] = token
    // const { iat, exp } = await this.decodeRefreshToken(refresh_token)
    // await databaseService.refreshTokens.insertOne(
    //   new RefreshToken({ user_id: new ObjectId(user_id), token: refresh_token, iat, exp })
    // )
    // return {
    //   access_token,
    //   refresh_token
    // }
  }
}
const userService = new UserService()
export default userService
