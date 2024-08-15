import { Table, Column, Model, DataType, HasOne, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript'
import category from './category.models'
import course_category from './categoryCourse.models'
import user from './user.models'
import promotion_combo from './promotionCombo.models'
import combo_product from './comboCourse.models'

@Table
class course extends Model {
  @Column({
    type: DataType.STRING(100),
    primaryKey: true
  })
  course_id!: string

  @ForeignKey(() => user)
  @Column({
    type: DataType.STRING(100)
  })
  user_id!: string
  @BelongsTo(() => user, { foreignKey: 'user_id' })
  users!: user // declare user: Users: Khai báo thuộc tính users sẽ chứa đối tượng User liên quan.

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
    type: DataType.SMALLINT,
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

  @BelongsToMany(() => category, () => course_category)
  declare categories: category[]
  @BelongsToMany(() => promotion_combo, () => combo_product)
  declare promotion_combos: promotion_combo[]
}

export default course
