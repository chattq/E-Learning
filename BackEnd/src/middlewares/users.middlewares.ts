import { Request, Response, NextFunction } from 'express'
import { checkSchema } from 'express-validator'
import { USERS_MESSAGES } from '~/constants/messages-error/users.messagerError'
import { ErrorWithStatus } from '~/models/Errors'
import userModel from '~/models/requests/users/users.models'
import userService from '~/services/users.services'
import { validate } from '~/utils/validation'
export const loginValidator = validate(
  checkSchema({
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
  })
)
export const registerValidator = validate(
  checkSchema({
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
          console.log(72, isExist)
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
  })
)
