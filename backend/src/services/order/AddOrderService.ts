import prismaClient from "../../prisma";

interface ItemRequest {
   order_id: string;
   product_id: string;
   amount: number;
}

class AddOrderService {
   async execute({ order_id, product_id, amount }: ItemRequest) {
      const order = await prismaClient.item.create({
         data: {
            order_id: order_id,
            product_id: product_id,
            amount: amount,
         },
      });
      return order;
   }
}

export { AddOrderService };
