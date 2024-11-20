import { Table, Column, Model, DataType, HasOne, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript'

import course from './course.models'
import user from './user.models'

@Table
class cart extends Model {
  @Column({
    type: DataType.STRING(200),
    primaryKey: true
  })
  declare cart_id: string

  @ForeignKey(() => user)
  @Column({
    type: DataType.STRING(200)
  })
  user_id!: string

  @ForeignKey(() => course)
  @Column({
    type: DataType.STRING(200)
  })
  course_id!: string

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 1 })
  quantity!: number

  @BelongsTo(() => user)
  user!: user

  @BelongsTo(() => course)
  course!: course
}

export default cart
