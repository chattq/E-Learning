import { Router } from 'express'
import usersRouter from './routes/users.routes'
import mediasRouter from './routes/medias.routes'
import categoriesRouter from './routes/categories.routes'
import blogsRouter from './routes/blogs.routes'
import account_bankRouters from './routes/account_bank.routes'
import coursesRouter from './routes/course.routes'

const router = Router()

router.use('/users', usersRouter)
router.use('/course', coursesRouter)
router.use('/medias', mediasRouter)
router.use('/AdCategories', categoriesRouter)
router.use('/blogs', blogsRouter)
router.use('/AccountBank', account_bankRouters)

export default router
