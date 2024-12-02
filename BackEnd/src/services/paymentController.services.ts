import cart_user_item from 'src/models/cartItem.models'
import category from '../models/category.models'
import { useAutoCodeGen } from '../utils/auto-code-gent'
import user from 'src/models/user.models'
import cart_user from 'src/models/cartUser.models'
import course from 'src/models/course.models'

export interface CategoryReqBody {
  CategoryCode?: string
  CategoryName?: string
  CategoryParentCode?: string
  CategoryDesc?: string
  FlagActive?: string
  CreatedBy?: string
  CreatedDate?: string
}

class PaymentService {
  async create(req: any, user_id: string | undefined) {
    const { autoCodeGen } = useAutoCodeGen()
    const dataUser = await cart_user.findOne({
      where: {
        user_id: user_id?.toUpperCase()
      }
    })
    const dataCourse = await course.findOne({
      where: {
        course_id: req.CourseCode
      }
    })

    await cart_user_item.create({
      cart_item_id: autoCodeGen('CARTITEM'),
      cart_id: dataUser?.dataValues.cart_id,
      course_id: req.CourseCode,
      totalPrice: dataCourse?.dataValues.course_price
    })

    return null
  }
}

const paymentService = new PaymentService()

export default paymentService
