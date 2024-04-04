import { Request, Response, NextFunction } from 'express'
import { PoolConnection } from 'mariaDB'
import { db } from '~/config/database.config'

export const checkMariaDBConnection = async (req: Request, res: Response, next: NextFunction) => {
  let connect: PoolConnection | undefined
  try {
    connect = await db.getConnection()
    ;(req as any).dbConnection = connect // Lưu kết nối vào req để sử dụng trong các middleware và route khác
    connect.release()
    next()
  } catch (err) {
    // Nếu không thể kết nối, trả về lỗi
    Object.getOwnPropertyNames(err).forEach((key) => {
      Object.defineProperty(err, key, { enumerable: true })
    })
    return res.status(500).json({
      Success: false,
      Data: {
        message: 'Error connecting to database',
        detail: err
      }
    })
  } finally {
    if (connect) connect.end() // Trả lại kết nối vào pool
  }
  // db.getConnection((err, connection) => {
  // if (err) {
  //   Object.getOwnPropertyNames(err).forEach((key) => {
  //     Object.defineProperty(err, key, { enumerable: true })
  //   })
  //   return res.status(500).json({
  //     Success: false,
  //     Data: {
  //       message: 'Error connecting to database',
  //       detail: err
  //     }
  //   })
  // }
  // // Kết nối thành công, giải phóng kết nối và chuyển tiếp yêu cầu đến middleware tiếp theo
  // connection.release()
  // next()
  // })
}
