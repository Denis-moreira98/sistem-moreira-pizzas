import { Request, Response } from "express";
import { AddOrderService } from "../../services/order/AddOrderService";

class AddOrderController {
   async handle(req: Request, res: Response) {
      const { order_id, product_id, amount } = req.body;

      const addItem = new AddOrderService();
      const order = await addItem.execute({
         order_id,
         product_id,
         amount,
      });
      return res.json(order);
   }
}

export { AddOrderController };
