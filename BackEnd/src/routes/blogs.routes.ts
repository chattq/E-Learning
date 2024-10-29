import { Router } from 'express'
import blogController from '~/controllers/blogs.controllers'
import { addNewBlogValidator, deleteBlogValidator } from '~/middlewares/blogs.middlewares'
import { accessTokenValidator } from '~/middlewares/users.middlewares'

import { wrapRequestHandler } from '~/utils/handlers'

const blogsRouter = Router()

blogsRouter.get('/getall', wrapRequestHandler(blogController.getAllBlogs))
blogsRouter.post('/create', addNewBlogValidator, accessTokenValidator, wrapRequestHandler(blogController.addNewBlog))
blogsRouter.delete('/delete', deleteBlogValidator, wrapRequestHandler(blogController.deleteBlog))

export default blogsRouter
