import { Router } from 'express'
import categoryController from 'src/controllers/categories.controllers'
import { categoriesValidator } from 'src/middlewares/categories.middlewares'
import { accessTokenValidator } from 'src/middlewares/users.middlewares'
import { wrapRequestHandler } from 'src/utils/handlers'

const categoriesRouter = Router()

/**
 * Description: tạo mới ngành hàng
 * Path: /AdCategories/create
 * Method: Post
 * Header:
 * Body: strJson
 */
categoriesRouter.post(
  '/create',
  accessTokenValidator,
  categoriesValidator,
  wrapRequestHandler(categoryController.categoryCreate)
)
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
