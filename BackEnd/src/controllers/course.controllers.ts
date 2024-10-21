import { Request, Response } from 'express'
import coursesService from '~/services/course.services'

class CourseController {
  async courseCreate(req: Request, res: Response) {
    const { strJson } = req.body

    const user_create: string | undefined = req.decoded_authorization?.user_id

    await coursesService.create(strJson, user_create)

    return res.json({
      isSuccess: true,
      message: 'Create course successful',
      data: null
    })
  }
  async courseGetListCourse(req: Request, res: Response) {
    const results = await coursesService.getListCourse()
    return res.json({
      isSuccess: true,
      message: 'Get list courses successfully',
      data: results
    })
  }
  async GetCourseByCode(req: Request, res: Response) {
    const { CourseCode } = req.body
    const results = await coursesService.getCourseByCode(CourseCode)
    return res.json({
      isSuccess: true,
      message: 'Get courses successfully',
      data: results
    })
  }
  async DeleteCourseByCode(req: Request, res: Response) {
    const { CourseCode } = req.body
    await coursesService.deleteCourseByCode(CourseCode)

    return res.json({
      isSuccess: true,
      message: 'Delete courses successfully',
      data: null
    })
  }
}
const courseController = new CourseController()
export default courseController
