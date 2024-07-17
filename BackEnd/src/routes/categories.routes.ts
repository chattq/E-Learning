import { Router } from 'express'
import categoryController from '~/controllers/categories.controllers'
import userController from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  emailVerifyTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const categoriesRouter = Router()

/**
 * Description: tạo mới ngành hàng
 * Path: /AdCategories/create
 * Method: Post
 * Header:
 * Body: strJson
 */
categoriesRouter.post('/create', accessTokenValidator, wrapRequestHandler(categoryController.categoryCreate))
/**
 * Description: lấy tất cả categories active
 * Path: /AdCategories/getAllActive
 * Method: Post
 * Header:
 * Body:
 */
categoriesRouter.post(
  '/getAllActive',
  accessTokenValidator,
  wrapRequestHandler(categoryController.categoryGetAllActive)
)

export default categoriesRouter
