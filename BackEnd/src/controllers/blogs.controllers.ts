import { Request, Response } from 'express'
import Blog from '~/models/blogs.models'
import blogService from '~/services/blogs.services'
import { ResultsReturnedUser } from '~/utils/results-api'

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

  // Thêm blog mới
  async addNewBlog(req: Request, res: Response) {
    const result = await blogService.BlogAddNew(req.body)
    return res.json(
      new ResultsReturnedUser({
        isSuccess: true,
        message: 'Blog create successful',
        data: { result }
      })
    )
  }

  // Xóa blog
  async deleteBlog(req: Request, res: Response) {
    console.log('req', req)
    const { id } = req.params
    const result = await blogService.BlogDelete(req.body)

    return res.json(
      new ResultsReturnedUser({
        isSuccess: true,
        message: result.message,
        data: null
      })
    )
  }
}

const blogController = new BlogController()
export default blogController
