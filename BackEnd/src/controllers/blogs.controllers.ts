import express, { Request, Response, NextFunction } from 'express'

import userService from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { pick } from 'lodash'

import { USERS_MESSAGES } from '~/constants/messages-handle/users.messages'

import { ResultsReturned } from '~/utils/results-api'
import { RegisterReqBody, userModelTypes } from '~/Models2/requests/users/users.requests'
import Blog from '~/models/blogs.models'
import blogService from '~/services/blogs.services'

class BlogController {
  // Lấy tất cả các bài blog
  async getAllBlogs(req: Request, res: Response) {
    try {
      const blogs = await Blog.findAll()
      return res.status(200).json({
        success: true,
        data: blogs
      })
    } catch (error: unknown) {
      let errorMessage = 'Có lỗi xảy ra khi lấy dữ liệu blog'
      if (error instanceof Error) {
        errorMessage = error.message
      }
      return res.status(500).json({
        success: false,
        message: errorMessage
      })
    }
  }

  //Thêm blog mới
  async addNewBlog(req: Request, res: Response) {
    const user_id = req.decoded_authorization?.user_id
    console.log(38, user_id)
    const result = await blogService.createBlogService(req.body)
    return res.json({
      message: 'Add new blog'
    })
  }
}

const blogController = new BlogController()
export default blogController
