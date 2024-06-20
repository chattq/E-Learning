import { Table, Column, Model, DataType, HasOne } from 'sequelize-typescript'

@Table
class Person extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  email!: string
  @Column({
    type: DataType.STRING,
    comment: 'anc'
  })
  password!: string
}

export default Person
