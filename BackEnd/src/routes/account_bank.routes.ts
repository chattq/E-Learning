import { Router } from 'express'
import accountBankController from '~/controllers/account_bank.controllers'
import { accessTokenValidator } from '~/middlewares/users.middlewares'

const account_bankRouters = Router()

account_bankRouters.post('/GetListBank', accessTokenValidator, accountBankController.getListBank)

export default account_bankRouters
