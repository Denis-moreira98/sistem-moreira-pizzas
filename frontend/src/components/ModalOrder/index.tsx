import Modal from "react-modal";
import styles from "./styles.module.scss";
import { FiX } from "react-icons/fi";

import { OrderItemProps } from "../../pages/dashboard/";

interface ModalOrderProps {
   isOpen: boolean;
   onRequestClose: () => void;
   order: OrderItemProps[];
   handleFinishOrder: (id: string) => void;
   calculateTotalPrice: (orderItems: OrderItemProps[]) => string;
}

export function ModalOrder({
   isOpen,
   onRequestClose,
   order,
   handleFinishOrder,
   calculateTotalPrice,
}: ModalOrderProps) {
   const customStyles = {
      content: {
         top: "50%",
         bottom: "auto",
         left: "50%",
         right: "auto",
         padding: "30px",
         transform: "translate(-50%, -50%)",
         backgroundColor: "#1d1d2e",
      },
   };

   const totalPrice = calculateTotalPrice(order);

   return (
      <Modal
         isOpen={isOpen}
         onRequestClose={onRequestClose}
         style={customStyles}
      >
         <button
            type="button"
            onClick={onRequestClose}
            className="react-modal-close"
            style={{ backgroundColor: "transparent", border: 0 }}
         >
            <FiX size={45} color="#f34748" />
         </button>

         <div className={styles.container}>
            <h2>Detalhes do pedido</h2>
            <span className={styles.table}>
               Mesa: <strong>{order[0]?.order?.table}</strong>
            </span>

            {order.map((item) => (
               <section key={item.id} className={styles.containerItem}>
                  <span>
                     {item.amount} - <strong>{item.product.name}</strong> {""} -{" "}
                     {""}
                     <span className={styles.price}>
                        {(
                           parseFloat(item.product.price) * item.amount
                        ).toLocaleString("pt-BR", {
                           style: "currency",
                           currency: "BRL",
                        })}
                     </span>
                  </span>

                  <span className={styles.description}>
                     {item.product.description}
                  </span>
               </section>
            ))}
            <div className={styles.linha}></div>
            <div className={styles.totalprice}>
               <h2>
                  Total: <span className={styles.price}>{totalPrice}</span>
               </h2>
            </div>
            <button
               onClick={() => handleFinishOrder(order[0].order_id)}
               className={styles.buttonOrder}
            >
               Concluir pedido
            </button>
         </div>
      </Modal>
   );
}
