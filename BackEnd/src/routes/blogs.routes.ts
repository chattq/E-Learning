import { Router } from 'express'
import blogController from '~/controllers/blogs.controllers'
import { addNewBlogValidator, deleteBlogValidator } from '~/middlewares/blogs.middlewares'
import { accessTokenValidator } from '~/middlewares/users.middlewares'

import { wrapRequestHandler } from '~/utils/handlers'

const blogsRouter = Router()

blogsRouter.get('/getall', wrapRequestHandler(blogController.getAllBlogs))
blogsRouter.post('/create', addNewBlogValidator, wrapRequestHandler(blogController.addNewBlog))
blogsRouter.delete('/delete', deleteBlogValidator, wrapRequestHandler(blogController.deleteBlog))

// usersRouter.post(
//   '/logout',
//   accessTokenValidator,
//   refreshTokenValidator,
//   wrapRequestHandler(userController.logoutController)
// )
// /**
//  * Description:
//  * Path: /verify-email
//  * Method: Post
//  * Header:
//  * Body: email_verify_token
//  */
// usersRouter.post('/verify-email', emailVerifyTokenValidator, wrapRequestHandler(userController.logoutController))

// /**
//  * Description: verify email when user client click on the link in email
//  * Path: /resen-verify-email
//  * Method: Post
//  * Header: {Authorization: 'Bearer ' + <accessToken>}
//  * Body: {}
//  */
// usersRouter.post('/resent-verify-email', accessTokenValidator, wrapRequestHandler(userController.logoutController))

// /**
//  * Description: get my profile
//  * Path: /me
//  * Method: Post
//  * Header: {Authorization: 'Bearer ' + <accessToken>}
//  */
// usersRouter.post('/me', accessTokenValidator, wrapRequestHandler(userController.getMeController))

export default blogsRouter
