import { config } from 'dotenv'
import jwt, { SignOptions } from 'jsonwebtoken'
config()

export const signToken = ({
  payload,
  privateKey = process.env.JWT_PRIVATE_KEY as string,
  options = {
    algorithm: 'HS256'
  }
}: {
  payload: string | Buffer | object
  privateKey?: string
  options?: SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (error, token) => {
      if (error) {
        throw reject(error)
      }
      resolve(token as string)
    })
  })
}
export const verifyToken = ({
  token,
  secretOrPublickey = process.env.JWT_PRIVATE_KEY as string
}: {
  token: string
  secretOrPublickey?: string
}) => {
  return new Promise<jwt.JwtPayload>((resolve, reject) => {
    jwt.verify(token, secretOrPublickey, (error, decoded) => {
      if (error) {
        throw reject(error)
      }
      resolve(decoded as jwt.JwtPayload)
    })
  })
}
