import { Table, Column, Model, DataType, HasOne, ForeignKey, BelongsTo } from 'sequelize-typescript'
import user from './user.models'

@Table
class account_bank extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  declare account_bank_id: number

  @Column({
    type: DataType.STRING(300),
    allowNull: false
  })
  account_name!: string
  @Column({
    type: DataType.STRING(300),
    allowNull: false
  })
  account_number!: string
  @Column({
    type: DataType.STRING(300)
  })
  create_at!: string
  @Column({
    type: DataType.ENUM('1', '0')
  })
  flag_active!: string

  // khóa ngoại
  @ForeignKey(() => user)
  @Column({
    type: DataType.STRING(100)
  })
  user_id!: string
  // mối liên hệ với bảng
  @BelongsTo(() => user, { foreignKey: 'user_id', onDelete: 'CASCADE' })
  user!: user // tham chiếu đến bảng
}

export default account_bank
