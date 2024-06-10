import { Request, Response } from 'express'
import categoryModel from '~/Models2/requests/adCategories/categories.models'
import { CategoryModel } from '~/Models2/requests/adCategories/categories.requests'

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
  async categoryGetAllActive(req: Request, res: Response) {
    const result = (await categoryModel.categoryGetAllActive()) as CategoryModel[]

    return res.json({
      isSuccess: true,
      message: 'Get category successful',
      data:
        result?.map((val: CategoryModel) => {
          return {
            CategoryCode: val.category_id,
            CategoryName: val.category_name,
            CategoryDesc: val.category_desc,
            FlagActive: val.category_active,
            CategoryParentCode: val.category_parent_code,
            CreatedBy: val.category_create_by,
            CreatedDate: val.category_create_at,
            UpdatedDate: val.category_update_at
          }
        }) || []
    })
  }
}
const categoryController = new CategoryController()
export default categoryController
