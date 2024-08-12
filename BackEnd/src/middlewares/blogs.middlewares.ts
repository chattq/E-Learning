import { checkSchema } from 'express-validator'
import { validate } from '~/utils/validation'
import { ErrorWithStatus } from '~/Models2/Errors'
import { BLOGS_MESSAGES } from '~/constants/messages-handle/blogs.messages'
import Blog from '~/models/blogs.models'

export const addNewBlogValidator = validate(
  checkSchema(
    {
      title: {
        notEmpty: {
          errorMessage: BLOGS_MESSAGES.TITLE_IS_REQUIRED // Giả sử bạn có file constants chứa thông báo lỗi
        },
        in: ['body'],
        isString: {
          errorMessage: BLOGS_MESSAGES.TITLE_MUST_BE_A_STRING
        },
        trim: true,
        escape: true
      },
      content: {
        notEmpty: {
          errorMessage: BLOGS_MESSAGES.CONTENT_IS_REQUIRED
        },
        in: ['body'],
        isString: {
          errorMessage: BLOGS_MESSAGES.CONTENT_MUST_BE_A_STRING
        },
        trim: true,
        escape: true
      },
      user_id: {
        notEmpty: {
          errorMessage: BLOGS_MESSAGES.USER_ID_IS_REQUIRED
        },
        in: ['body'],
        custom: {
          options: async (value: string) => {
            const isUserExist = await Blog.findByPk(value)
            if (!isUserExist) {
              throw new ErrorWithStatus({
                message: BLOGS_MESSAGES.USER_DOES_NOT_EXIST,
                status: 400
              })
            }
            return true
          }
        }
      },
      status: {
        in: ['body'],
        optional: true,
        isIn: {
          options: [['active', 'inactive']],
          errorMessage: BLOGS_MESSAGES.STATUS_IS_INVALID
        }
      },
      image_url: {
        in: ['body'],
        optional: true,
        isURL: {
          errorMessage: BLOGS_MESSAGES.INVALID_IMAGE_URL
        }
      }
    },
    ['body']
  )
)
