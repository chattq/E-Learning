export interface CategoryReqBody {
  CategoryCode?: string
  CategoryName?: string
  CategoryParentCode?: string
  CategoryDesc?: string
  FlagActive?: string
  CreatedBy?: string
  CreatedDate?: string
}
export interface CategoryModel {
  category_id: string
  course_id: string
  category_name: string
  category_desc: string
  catefory_total_course: string
  category_active: string
  category_parent_code: string
  category_create_by: string
  category_create_at: string
  category_update_at: string
}
