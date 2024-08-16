import { config } from 'dotenv'
import { vietQR } from '~/config/vietQr.config'

config()

interface BlogCreateReqBody {
  title?: string
  content: string
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
}
const accountBankServices = new AccountBankService()
export default accountBankServices
