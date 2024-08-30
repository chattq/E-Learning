import { config } from 'dotenv'
import { vietQR } from '~/config/vietQr.config'

config()

interface AcountBankCreateReqBody {
  BankCode: string
  AccountNumber: string
  NameAccount: string
  FlagDefault: string
}

class AccountBankService {
  async getListBank() {
    return new Promise<void>((resolve, reject) => {
      return vietQR
        .getBanks()
        .then((banks: any) => resolve(banks))
        .catch((err: any) => reject(err))
    })
  }
  async create_account(payload: AcountBankCreateReqBody, user_id: string | undefined) {
    return new Promise<void>((resolve, reject) => {
      return vietQR
        .getBanks()
        .then((banks: any) => resolve(banks))
        .catch((err: any) => reject(err))
    })
  }
}
const accountBankServices = new AccountBankService()
export default accountBankServices
