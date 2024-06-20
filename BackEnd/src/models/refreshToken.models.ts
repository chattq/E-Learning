import { Table, Column, Model, DataType, HasOne, ForeignKey, BelongsTo } from 'sequelize-typescript'
import User from './user.models'

@Table
class Refresh_token extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  declare id: number

  @Column({
    type: DataType.STRING(300),
    allowNull: false
  })
  token!: string
  @Column({
    type: DataType.STRING(300)
  })
  create_at!: string

  // khóa ngoại
  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING(100)
  })
  user_id!: string
  // mối liên hệ với bảng
  @BelongsTo(() => User, { foreignKey: 'user_id' })
  users!: User // tham chiếu đến bảng
}

export default Refresh_token
