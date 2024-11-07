import { Router } from 'express'
import courseController from 'src/controllers/course.controllers'
import { accessTokenValidator } from 'src/middlewares/users.middlewares'
import { wrapRequestHandler } from 'src/utils/handlers'

const coursesRouter = Router()

coursesRouter.post('/create', accessTokenValidator, wrapRequestHandler(courseController.courseCreate))
coursesRouter.post('/GetListCourse', accessTokenValidator, wrapRequestHandler(courseController.courseGetListCourse))
coursesRouter.post('/GetCourseByCode', accessTokenValidator, wrapRequestHandler(courseController.GetCourseByCode))
coursesRouter.post('/Delete', accessTokenValidator, wrapRequestHandler(courseController.DeleteCourseByCode))

export default coursesRouter
