import db from '~/config/database.config'
import { Request, Response, NextFunction } from 'express'

export const checkMySQLConnection = (req: Request, res: Response, next: NextFunction) => {
  // Thử kết nối vào cơ sở dữ liệu
  db.getConnection((err, connection) => {
    if (err) {
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
    }

    // Kết nối thành công, giải phóng kết nối và chuyển tiếp yêu cầu đến middleware tiếp theo
    connection.release()
    next()
  })
}
