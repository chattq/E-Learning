import { NextFunction, Request, Response } from 'express'
import { omit } from 'lodash'

export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    return res.status(err.status).json({
      isSuccess: false,
      data: omit(err, ['status'])
    })
  }
  Object.getOwnPropertyNames(err).forEach((key) => {
    Object.defineProperty(err, key, { enumerable: true })
  })

  res.status(500).json({
    isSuccess: false,
    data: omit(err, ['stack'])
  })
}
