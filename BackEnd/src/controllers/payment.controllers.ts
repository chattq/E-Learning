import { NextFunction, Request, Response } from 'express'
import cartService from 'src/services/cart.services'

class PaymentController {
  async addToCart(req: Request, res: Response) {
    const user_id = req.decoded_authorization?.user_id
    await cartService.create(req.body, user_id)

    return res.json({
      isSuccess: true,
      message: 'Thêm vào giỏ hàng thành công!',
      data: null
    })
  }
}
const paymentController = new PaymentController()
export default paymentController
