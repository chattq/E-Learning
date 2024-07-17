import { Table, Column, Model, DataType, HasOne, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript'
import User from './user.models'
import Category from './category.models'
import Course_category from './categoryCourse.models'

@Table
class Course extends Model {
  @Column({
    type: DataType.STRING(100),
    primaryKey: true
  })
  course_id!: string

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING(100)
  })
  user_id!: string
  @BelongsTo(() => User, { foreignKey: 'user_id' })
  users!: User // declare user: Users: Khai báo thuộc tính users sẽ chứa đối tượng User liên quan.

  @Column({
    type: DataType.DECIMAL(18, 2)
  })
  course_price!: number
  @Column({
    type: DataType.DECIMAL(18, 2)
  })
  course_discount!: number
  @Column({
    type: DataType.STRING(150),
    allowNull: false
  })
  course_name!: string
  @Column({
    type: DataType.STRING(500),
    unique: true
  })
  course_desc!: string
  @Column({
    type: DataType.DECIMAL(10, 1)
  })
  course_rate!: string
  @Column({
    type: DataType.INTEGER
  })
  course_number_buyers!: number
  @Column({
    type: DataType.STRING(50),
    defaultValue: '0'
  })
  course_active!: string
  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    defaultValue: 1
  })
  course_comming_soon!: string
  @Column({
    type: DataType.STRING
  })
  course_intro_video!: string
  @Column({
    type: DataType.STRING(100)
  })
  course_create_by!: string
  @Column({
    type: DataType.STRING(100)
  })
  course_create_at!: string
  @Column({
    type: DataType.STRING(100)
  })
  course_update_at!: string

  @BelongsToMany(() => Category, () => Course_category)
  declare categories: Category[]
}

export default Course
