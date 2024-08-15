import { config } from 'dotenv'
import userModel from '~/Models2/requests/users/users.models'
import { RegisterReqBody } from '~/Models2/requests/users/users.requests'
import { TokenType } from '~/constants/enums'
import blog from '~/models/blogs.models'
import refresh_token from '~/models/refreshToken.models'
import user from '~/models/user.models'
import { hasPassword } from '~/utils/crypto'

import { signToken } from '~/utils/jwt'
import { useGetTime } from '~/utils/useGetTime'
const { getTimeMoment } = useGetTime()

config()

class BlogService {
  async BlogAddNew(payload: any) {
    const { title, content } = payload
    const dataCreateBlog = {
      blog_title: title,
      blog_content: content
    }
    await blog.create(dataCreateBlog)
    return { message: 'success' }
  }

  // Xóa blog theo ID
  async BlogDelete(blogId: number) {
    console.log('blogId', blogId)
    const blogToDelete = await blog.findOne({ where: { blog_id: blogId } })

    if (!blogToDelete) {
      return { message: 'Blog not found', success: false }
    }

    await blogToDelete.destroy()
    return { message: 'Blog deleted successfully', success: true }
  }
}
const blogService = new BlogService()
export default blogService
