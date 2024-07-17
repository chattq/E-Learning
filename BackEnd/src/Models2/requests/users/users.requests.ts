import { JwtPayload } from 'jsonwebtoken'
import { TokenType } from '~/constants/enums'

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
export interface userModelTypes {
  user_id?: string
  user_email?: string
  user_name?: string
  user_phone?: string
  user_password?: string
  user_address?: string
  user_avatar?: string
  email_verify_token?: string
  forgot_password_token?: string
  verify?: string
  user_date_of_birth?: string
  user_website?: string
  user_bio?: string
  user_role?: string
  user_active?: string
  user_create_at?: string
  user_update_at?: string
  user_language?: string
  user_time_zone?: string
}
