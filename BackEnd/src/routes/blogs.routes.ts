import { Router } from 'express'
import blogController from 'src/controllers/blogs.controllers'
import { addNewBlogValidator, deleteBlogValidator } from 'src/middlewares/blogs.middlewares'
import { accessTokenValidator } from 'src/middlewares/users.middlewares'
import { wrapRequestHandler } from 'src/utils/handlers'

const blogsRouter = Router()

blogsRouter.get('/getall', wrapRequestHandler(blogController.getAllBlogs))
blogsRouter.post('/create', addNewBlogValidator, accessTokenValidator, wrapRequestHandler(blogController.addNewBlog))
blogsRouter.delete('/delete', deleteBlogValidator, wrapRequestHandler(blogController.deleteBlog))

export default blogsRouter
