import { Op } from 'sequelize'
import { useAutoCodeGen } from '../utils/auto-code-gent'
import purchased_course from 'src/models/purchasedCourse.models'

export interface ReqBody {
  CourseId: string
  UserId: string
}

class UserCoursesService {
  async create(user_id: string | undefined, course_id: any) {
    const { autoCodeGen } = useAutoCodeGen()
    const userCourseId = autoCodeGen('USERCOURSE')

    const dbUserCourse = {
      id: userCourseId,
      user_id: user_id,
      course_id: course_id
    }

    await purchased_course.create(dbUserCourse)

    return {
      status: true,
      message: 'create successfully'
    }
  }
  // async getListCourse() {
  //   const result = await course.findAll()
  //   return result
  // }
  // async getCourseByCode(code: string) {
  //   const InforCourse = await course.findOne({
  //     where: { course_id: code },
  //     include: [
  //       {
  //         model: course_chapter,
  //         include: [course_lesson] // Bao gồm cả Lesson trong Chapter
  //       },
  //       {
  //         model: course_requirement
  //       },
  //       {
  //         model: course_knowledge
  //       }
  //     ]
  //   })

  //   return {
  //     InforCourse: InforCourse
  //   }
  // }
  // async deleteCourseByCode(code: string) {
  //   // Xóa các lessons liên quan thông qua chapters
  //   await course_lesson.destroy({
  //     where: {
  //       course_chapter_code: {
  //         [Op.in]: (await course_chapter.findAll({ where: { course_id: code } })).map(
  //           (chapter) => chapter.course_chapter_code
  //         )
  //         //SELECT * FROM "Courses" WHERE "id" IN (1, 2, 3);
  //       }
  //     }
  //   })

  //   // Xóa các chapters liên quan
  //   await course_chapter.destroy({ where: { course_id: code } })

  //   // Xóa khóa học
  //   await course.destroy({ where: { course_id: code } })

  //   return null
  // }
}

const userCoursesService = new UserCoursesService()

export default userCoursesService
