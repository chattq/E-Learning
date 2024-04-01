import db from '~/config/database.config'

import { useGetTime } from '~/utils/useGetTime'
import { hasPassword } from '~/utils/crypto'

export interface RegisterReqBody {
  name?: string
  email: string
  password: string
  confirm_password?: string
  date_of_birth?: string
}
class UserModel {
  createUser(payload: RegisterReqBody) {
    const { getTimeMoment } = useGetTime()
    const { name, email, password, date_of_birth } = payload

    const insertQuery = `INSERT INTO users (id, name, email, password, date_of_birth, created_at) VALUES (?, ?, ?, ?, ?, ?)`
    return new Promise((resolve, reject) => {
      db.query(
        insertQuery,
        [email.toUpperCase(), name, email, hasPassword(password), date_of_birth, getTimeMoment()],
        (err: any, results: any) => {
          if (err) {
            reject(err)
          } else {
            resolve(results)
          }
        }
      )
    })
  }

  getUserByEmail(email: string) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM `users` WHERE `email` = ?', [email], (err: any, results: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  }
  getUserByEmailAndPassword(email: string, password: string) {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM `users` WHERE `email` = ? AND `password`= ?',
        [email, hasPassword(password)],
        (err: any, results: any) => {
          if (err) {
            reject(err)
          } else {
            resolve(results)
          }
        }
      )
    })
  }
}
const userModel = new UserModel()
export default userModel
