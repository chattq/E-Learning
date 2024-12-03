import { NextFunction, Request, Response } from 'express'
import cartService from 'src/services/cart.services'
import paymentService from 'src/services/payment.services'

class PaymentController {
  async addToPayment(req: Request, res: Response) {
    const user_id = req.decoded_authorization?.user_id

    return res.json({
      isSuccess: true,
      message: 'Thêm vào giỏ hàng thành công!',
      data: null
    })
  }
  async GetListPayment(req: Request, res: Response) {
    const user_id = req.decoded_authorization?.user_id
    const { strJson } = req.body
    const dataListPayment = await paymentService.getListPayment(strJson, user_id)

    return res.json({
      isSuccess: true,
      message: 'Danh sách thanh toán',
      data: dataListPayment
    })
  }
}
const paymentController = new PaymentController()
export default paymentController
