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

interface BlogCreateReqBody {
  title?: string
  content: string
}

class BlogsService {
  async createBlogService(payload: BlogCreateReqBody) {
    const { title, content } = payload
    const dataCreateUser = {
      title: title,
      content: content
    }
    await blog.create(dataCreateUser)
    return
  }
}
const blogService = new BlogsService()
export default blogService
