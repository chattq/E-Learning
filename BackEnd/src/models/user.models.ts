import { Table, Column, Model, DataType, HasOne, HasMany } from 'sequelize-typescript'
import Refresh_token from './refreshToken.models'
import Course from './course.models'

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
    defaultValue: ''
  })
  user_name!: string
  @Column({
    type: DataType.STRING(50),
    defaultValue: ''
  })
  user_phone!: string
  @Column({
    type: DataType.STRING(100)
  })
  user_password!: string
  @Column({
    type: DataType.STRING
  })
  user_address!: string
  @Column({
    type: DataType.STRING
  })
  user_avatar!: string
  @Column({
    type: DataType.STRING(300)
  })
  email_verify_token!: string
  @Column({
    type: DataType.STRING(300)
  })
  forgot_password_token!: string
  @Column({
    type: DataType.STRING(50),
    defaultValue: 'Unverified'
  })
  verify!: string

  @Column({
    type: DataType.STRING(100)
  })
  user_date_of_birth!: string
  @Column({
    type: DataType.STRING(200)
  })
  user_website!: string
  @Column({
    type: DataType.STRING(500)
  })
  user_bio!: string
  @Column({
    type: DataType.STRING(50),
    defaultValue: '1'
  })
  user_role!: string
  @Column({
    type: DataType.STRING(50),
    defaultValue: '1'
  })
  user_active!: string
  @Column({
    type: DataType.STRING(10),
    defaultValue: 'vi'
  })
  user_language!: string
  @Column({
    type: DataType.STRING(10),
    defaultValue: '7'
  })
  user_time_zone!: string

  // thực hiện mối quan hệ
  @HasOne(() => Refresh_token)
  declare refresh_tokens: Refresh_token
  //Từ khóa declare được sử dụng trong TypeScript để thông báo cho trình biên dịch biết rằng thuộc tính này sẽ được cung cấp bởi Sequelize và không được khởi tạo rõ ràng trong constructor.
  @HasMany(() => Course)
  courses!: Course[]
}

export default User
