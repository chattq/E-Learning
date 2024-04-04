import mariaDB from 'mariaDB'

require('dotenv').config()
// Create the connection pool. The pool-specific settings are the defaults
export const db = mariaDB.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USERNAME,
  database: process.env.DB_NAME_DATABASE,
  password: process.env.DB_PASSWORD,
  connectionLimit: 100,
  idleTimeout: 60000 // idle connections timeout, in milliseconds, the default value 60000
})

export const mariaDBQuery = async (query: any, value: any, callBack: any) => {
  try {
    const connect = await db.getConnection()
    const res = await connect.query(query, value)
    callBack(null, res)
  } catch (err) {
    callBack(err, null)
  }
}
