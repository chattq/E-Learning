import { Table, Column, Model, DataType, HasOne, ForeignKey } from 'sequelize-typescript'
import Course from './course.models'
import Category from './category.models'

@Table
class Course_category extends Model {
  
  @ForeignKey(() => Category)
  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  category_id!: string
  @ForeignKey(() => Course)
  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  course_id!: string
}

export default Course_category
