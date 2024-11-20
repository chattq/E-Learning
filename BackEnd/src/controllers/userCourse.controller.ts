import { Request, Response } from 'express'
import userCoursesService from 'src/services/user_course.services'

class UserCourseController {
  async CreateUserCourse(req: Request, res: Response) {
    const { user_id, course_id } = req.body

    await userCoursesService.create(user_id, course_id)

    return res.json({
      isSuccess: true,
      message: 'Create user course successful',
      data: null
    })
  }
  // async getListUserCourse(req: Request, res: Response) {
  //   const results = await coursesService.getListCourse()
  //   return res.json({
  //     isSuccess: true,
  //     message: 'Get list courses successfully',
  //     data: results
  //   })
  // }

  // async DeleteUserCourseByCode(req: Request, res: Response) {
  //   const { CourseCode } = req.body
  //   await coursesService.deleteCourseByCode(CourseCode)

  //   return res.json({
  //     isSuccess: true,
  //     message: 'Delete courses successfully',
  //     data: null
  //   })
  // }
}
const userCourseController = new UserCourseController()
export default userCourseController
