import { mariaDBQuery } from '~/config/database.config'

import { useGetTime } from '~/utils/useGetTime'
import { hasPassword } from '~/utils/crypto'
import { RegisterReqBody } from './users.requests'

class UserModel {
  createUser(payload: RegisterReqBody) {
    const { getTimeMoment } = useGetTime()
    const { name, email, password, date_of_birth } = payload
    const insertQuery = `INSERT INTO users (id, name, email, password, date_of_birth, created_at) VALUES (?, ?, ?, ?, ?, ?)`
    return new Promise((resolve, reject) => {
      mariaDBQuery(
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
      mariaDBQuery('SELECT * FROM `users` WHERE `email` = ?', [email], (err: any, results: any) => {
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
      mariaDBQuery(
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
  logout(refresh_token: string) {
    return new Promise((resolve, reject) => {
      mariaDBQuery(
        'SELECT * FROM `users` WHERE `email` = ? AND `password`= ?',
        [refresh_token],
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
