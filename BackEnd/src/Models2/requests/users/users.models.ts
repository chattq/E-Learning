import { mariaDBQuery } from '~/config/database.config'
import { hasPassword } from '~/utils/crypto'
import { RegisterReqBody } from './users.requests'
import { useGetTime } from '~/utils/useGetTime'

const { getTimeMoment } = useGetTime()

class UserModel {
  createUser(payload: RegisterReqBody) {
    const { name, email, password } = payload
    const insertQuery = `INSERT INTO users (user_id, user_name, user_email, user_password, user_create_at) VALUES (?, ?, ?, ?, ?)`
    return new Promise((resolve, reject) => {
      mariaDBQuery(
        insertQuery,
        [email.toUpperCase(), name, email, hasPassword(password), getTimeMoment()],
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
  updateRefreshToken(user_id: string, refreshToken: string) {
    const updateQuery = `UPDATE refresh_token SET token = ? WHERE user_id =?`
    return new Promise((resolve, reject) => {
      mariaDBQuery(updateQuery, [refreshToken, user_id], (err: any, results: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  }
  findUserByEmail(email: string) {
    return new Promise((resolve, reject) => {
      mariaDBQuery('SELECT * FROM `users` WHERE `user_email` = ?', [email], (err: any, results: any) => {
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
        'SELECT * FROM `users` WHERE `user_email` = ? AND `user_password`= ?',
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
  saveRefreshToken(user_id: string, refreshToken: string) {
    return new Promise((resolve, reject) => {
      mariaDBQuery(
        `INSERT INTO refresh_token (user_id, token, create_at) VALUES (?, ?, ?)`,
        [user_id, refreshToken, getTimeMoment()],
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
  findRefreshToken(refreshToken: string, user_id: string) {
    return new Promise((resolve, reject) => {
      mariaDBQuery(
        'SELECT `token` FROM `refresh_token` WHERE `user_id` = ? AND `token` = ?',
        [user_id, refreshToken],
        (err: any, results: any) => {
          if (err) {
            reject(err)
          } else {
            resolve(results[0])
          }
        }
      )
    })
  }
  logoutQuery(user_id: string) {
    return new Promise((resolve, reject) => {
      mariaDBQuery(
        'UPDATE refresh_token SET token = ? WHERE user_id = ?',
        [null, user_id],
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
