import { config } from 'dotenv'
import { Request } from 'express'
import { checkSchema } from 'express-validator'
import { JsonWebTokenError } from 'jsonwebtoken'
import { capitalize } from 'lodash'
import { httpStatus } from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages-handle/users.messages'
import { ErrorWithStatus } from '~/models/Errors'
import userModel from '~/models/requests/users/users.models'
import userService from '~/services/users.services'
import { verifyToken } from '~/utils/jwt'
import { validate } from '~/utils/validation'
config()

export const loginValidator = validate(
  checkSchema(
    {
      email: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIRED
        },
        in: ['body'],
        isEmail: true,
        trim: true,
        custom: {
          options: async (value: string, { req }) => {
            const { email, password } = req.body
            const isExist = (await userModel.getUserByEmailAndPassword(email, password)) as any
            if (isExist?.length === 0) {
              throw new ErrorWithStatus({ message: USERS_MESSAGES.EMAIL_AND_PASSWORD_REQUIRED, status: 400 })
            }
            return true
          }
        }
      },
      password: {
        notEmpty: true,
        isStrongPassword: {
          options: {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          },
          errorMessage:
            'Password must be at least 6 characters, and at least 1 lowercase,1 uppercase,1 numbers, 1 symbols'
        },
        in: ['body'],
        isLength: {
          options: { min: 6, max: 50 },
          errorMessage: 'Password must be at least 6 characters long'
        }
      }
    },
    ['body']
  )
)
export const registerValidator = validate(
  checkSchema(
    {
      name: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.NAME_IS_REQUIRED
        },
        in: 'body',
        isString: {
          errorMessage: USERS_MESSAGES.NAME_MUST_BE_A_STRING
        },
        trim: true,
        escape: true
      },
      email: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIRED
        },
        in: ['body'],
        isEmail: true,
        trim: true,
        custom: {
          options: async (value: string) => {
            const isExist = (await userService.getUserByEmail(value)) as any
            if (isExist?.length > 0) {
              throw new ErrorWithStatus({ message: USERS_MESSAGES.EMAIL_ALREADY_EXIST, status: 400 })
            }
            return true
          }
        }
      },
      password: {
        notEmpty: true,
        isStrongPassword: {
          options: {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          },
          errorMessage:
            'Password must be at least 6 characters, and at least 1 lowercase,1 uppercase,1 numbers, 1 symbols'
        },
        in: ['body'],
        isLength: {
          options: { min: 6, max: 50 },
          errorMessage: 'Password must be at least 6 characters long'
        }
      },
      confirm_password: {
        notEmpty: true,
        isStrongPassword: {
          errorMessage:
            'Password must be at least 6 characters, and at least 1 lowercase,1 uppercase,1 numbers, 1 symbols',
          options: {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          }
        },
        in: ['body'],
        isLength: {
          options: { min: 6, max: 50 },
          errorMessage: 'Password must be at least 6 characters long'
        },
        custom: {
          options: (value, { req }) => {
            if (value !== req.body.password) {
              throw new Error('Passwords do not match')
            }
            return true
          },
          errorMessage: 'Passwords do not match'
        }
      },
      date_of_birth: {
        isDate: {
          options: {
            format: 'YYYY-MM-DD'
          }
        },
        notEmpty: true,
        in: ['body'],
        isISO8601: true,
        errorMessage: 'Invalid date of birth'
      }
    },
    ['body']
  )
)

export const accessTokenValidator = validate(
  checkSchema(
    {
      Authorization: {
        custom: {
          options: async (value: string, { req }) => {
            const access_token = (value || '').split(' ')[1]
            if (!access_token) {
              throw new ErrorWithStatus({ message: USERS_MESSAGES.ACCESS_TOKEN_IS_REQUIRED, status: 401 })
            }
            try {
              const decoded_authorization = await verifyToken({
                token: access_token,
                secretOrPublickey: process.env.JWT_SECRET_ACCESS_TOKEN as string
              })
              ;(req as Request).decoded_authorization = decoded_authorization
            } catch (error) {
              throw new ErrorWithStatus({ message: capitalize((error as JsonWebTokenError).message), status: 401 })
            }
            return true
          }
        }
      }
    },
    ['headers']
  )
)
export const refreshTokenValidator = validate(
  checkSchema(
    {
      refresh_token: {
        trim: true,
        custom: {
          options: async (value: string, { req }) => {
            console.log(value)
            try {
              // const [decoded_refresh_token, refreshToken] = await Promise.all([
              //   verifyToken({ token: value }),
              //   'lưu token  vào db'
              // ])
              const decoded_refresh_token = await verifyToken({
                token: value,
                secretOrPublickey: process.env.JWT_SECRET_REFRESH_TOKEN as string
              })
              ;(req as Request).decoded_refresh_token = decoded_refresh_token
              // if (refreshToken === null) {
              //   throw new ErrorWithStatus({ message: USERS_MESSAGES.REFRESH_TOKEN_IS_NOT_EXIST, status: 401 })
              // }
              // thêm bước kiểm tra có trong db hay không =>>> chưa thiết kế nên chưa làm
            } catch (error) {
              if (error instanceof JsonWebTokenError) {
                throw new ErrorWithStatus({
                  message: capitalize(error.message),
                  status: 401
                })
              }
              throw error
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)
export const emailVerifyTokenValidator = validate(
  checkSchema(
    {
      email_verify_token: {
        trim: true,
        custom: {
          options: async (value: string, { req }) => {
            if (!value) {
              throw new ErrorWithStatus({
                message: USERS_MESSAGES.EMAIL_VERIFY_TOKEN_IS_REQUIRED,
                status: httpStatus.UNAUTHORIZED
              })
            }
            const decoded_email_verify_token = await verifyToken({
              token: value,
              secretOrPublickey: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string
            })
            ;(req as Request).decoded_authorization = decoded_email_verify_token
            return true
          }
        }
      }
    },
    ['body']
  )
)
