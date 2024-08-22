import express, { Request, Response, NextFunction } from 'express'
import accountBankServices from '~/services/account_bank.services'

import blogService from '~/services/blogs.services'
import { ResultsReturned } from '~/utils/results-api'

class AccountBankController {
  //Thêm blog mới
  async getListBank(req: Request, res: Response) {
    const user_id = req.decoded_authorization?.user_id
    console.log(38, user_id)
    const result = await accountBankServices.getListBank()
    return res.json(
      new ResultsReturned({
        isSuccess: true,
        message: 'Get success',
        data: result
      })
    )
  }
  async createBank(req: Request, res: Response) {
    const user_id = req.decoded_authorization?.user_id
    await accountBankServices.create_account(req.body, user_id)
    return res.json(
      new ResultsReturned({
        isSuccess: true,
        message: 'Tạo thành công',
        data: []
      })
    )
  }
}

const accountBankController = new AccountBankController()
export default accountBankController
