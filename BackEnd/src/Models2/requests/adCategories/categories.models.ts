import { mariaDBQuery } from '~/config/database.config'
import { useGetTime } from '~/utils/useGetTime'
import { CategoryReqBody } from './categories.requests'
import { useAutoCodeGen } from '~/utils/auto-code-gent'

const { getTimeMoment } = useGetTime()
const { autoCodeGenCategory } = useAutoCodeGen()

class CategoryModel {
  categoryCreate(payload: CategoryReqBody, user_id: string) {
    const { CategoryCode, CategoryDesc, CategoryName, CategoryParentCode, CreatedBy, CreatedDate, FlagActive } = payload
    const insertQuery = `INSERT INTO categories (category_id, category_name, category_desc, category_active, category_parent_code,category_create_by,category_create_at) VALUES (?, ?, ?, ?, ?, ?, ?)`
    return new Promise((resolve, reject) => {
      mariaDBQuery(
        insertQuery,
        [
          autoCodeGenCategory(),
          CategoryName,
          CategoryDesc,
          FlagActive,
          CategoryParentCode,
          CreatedBy,
          user_id,
          getTimeMoment()
        ],
        (err: any, results: any) => {
          if (err) {
            reject(err)
          } else {
            resolve(results)
          }
        }
      )
    })
  }
  categoryGetAllActive() {
    const insertQuery = `SELECT * FROM categories WHERE category_active = 1 `
    return new Promise((resolve, reject) => {
      mariaDBQuery(insertQuery, [], (err: any, results: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  }
}
const categoryModel = new CategoryModel()
export default categoryModel
