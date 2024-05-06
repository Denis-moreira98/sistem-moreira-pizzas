import { OrderItemProps } from "@/pages/dashboard";

export function calculateTotalPrice(orderItems: OrderItemProps[]): string {
   let totalPrice = 0;

   orderItems.forEach((item) => {
      const itemPrice = parseFloat(item.product.price);
      totalPrice += item.amount * itemPrice;
   });

   // Formatando o preço total como moeda brasileira
   const formattedTotalPrice = totalPrice.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
   });

   return formattedTotalPrice;
}
