import { Table, Column, Model, DataType, HasOne } from 'sequelize-typescript'

@Table
class User extends Model {
  @Column({
    type: DataType.STRING(100),
    primaryKey: true
  })
  user_id!: string

  @Column({
    type: DataType.STRING(200),
    allowNull: true
  })
  user_email!: string
  @Column({
    type: DataType.STRING,
    comment: 'anc'
  })
  password!: string
}

export default User
