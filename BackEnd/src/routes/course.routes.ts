import { Router } from 'express'
import courseController from '~/controllers/course.controllers'
import userController from '~/controllers/users.controllers'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const coursesRouter = Router()

coursesRouter.post('/create', accessTokenValidator, wrapRequestHandler(courseController.courseCreate))
coursesRouter.post('/GetListCourse', accessTokenValidator, wrapRequestHandler(courseController.courseGetListCourse))

export default coursesRouter
