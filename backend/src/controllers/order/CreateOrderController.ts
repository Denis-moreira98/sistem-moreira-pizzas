import { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";

class CreateOrderController {
   async handle(req: Request, res: Response) {
      const { table, name } = req.body;

      const createOrderController = new CreateOrderService();

      const order = await createOrderController.execute({
         table,
         name,
      });

      return res.json(order);
   }
}

export { CreateOrderController };
