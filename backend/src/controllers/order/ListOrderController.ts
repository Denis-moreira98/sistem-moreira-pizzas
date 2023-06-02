import { Request, Response } from "express";
import { ListOrderService } from "../../services/order/ListOrderService";

class ListOrderController {
   async handle(req: Request, res: Response) {
      const listerOrderService = new ListOrderService();
      const order = await listerOrderService.execute();

      return res.json(order);
   }
}

export { ListOrderController };
