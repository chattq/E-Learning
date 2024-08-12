import express, { Request, Response, NextFunction } from 'express'

import userService from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { pick } from 'lodash'

import { USERS_MESSAGES } from '~/constants/messages-handle/users.messages'

import { ResultsReturnedUser } from '~/utils/results-api'
import { RegisterReqBody, userModelTypes } from '~/Models2/requests/users/users.requests'
import Blog from '~/models/blogs.models'

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
    console.log('res', res)
    return res.json({
      message: 'Add new blog'
    })
    // try {
    //   const { title, content, user_id, status, image_url } = req.body

    //   // Tạo một bài blog mới với dữ liệu từ request
    //   const newBlog = await Blog.create({
    //     title,
    //     content,
    //     user_id,
    //     status: status || 'inactive', // Mặc định là 'inactive' nếu không có
    //     image_url: image_url || '' // Mặc định là chuỗi rỗng nếu không có
    //   })

    //   return res.status(201).json({
    //     success: true,
    //     message: 'Blog has been created successfully',
    //     data: newBlog
    //   })
    // } catch (error: unknown) {
    //   return res.status(500).json({
    //     success: false,
    //     message: 'An error occurred while creating the blog',
    //     error: (error as Error).message
    //   })
    // }
  }
}

const blogController = new BlogController()
export default blogController
