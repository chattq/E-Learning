import { Request, Response } from 'express'
import categoryModel from '~/models/requests/adCategories/categories.models'

class CategoryController {
  async categoryCreate(req: Request, res: Response) {
    const { strJson } = req.body
    const user_id = req.decoded_authorization?.user_id

    await categoryModel.categoryCreate(JSON.parse(strJson), user_id as string)
    return res.json({
      isSuccess: true,
      message: 'Create category successful',
      data: null
    })
  }
}
const categoryController = new CategoryController()
export default categoryController
