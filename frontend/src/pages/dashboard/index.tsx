import { useState } from "react";
import { canSSRAuth } from "../../utils/canSSRAuth";
import Head from "next/head";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss";
import { FiRefreshCcw } from "react-icons/fi";

import { setupAPIClient } from "../../services/api";

import Modal from "react-modal";

import { ModalOrder } from "../../components/ModalOrder";

type OrdersProps = {
   id: string;
   table: string | number;
   status: boolean;
   draft: boolean;
   name: string | null;
   //coloquei o map como any para resolver esse problema no type script
   //Property 'map' does not exist on type 'any[] | OrdersProps'.
   map: any;
};

interface HomeProps {
   orders: OrdersProps;
}

export type OrderItemProps = {
   id: string;
   amount: number;
   order_id: string;
   product_id: string;
   product: {
      id: string;
      name: string;
      description: string;
      price: string;
      banner: string;
   };
   order: {
      id: string;
      table: string | number;
      status: boolean;
      name: string | null;
   };
};

export default function Dashboard({ orders }: HomeProps) {
   const [orderList, SetOrderList] = useState(orders || []);

   const [modalItem, setModalItem] = useState<OrderItemProps[]>();
   const [modalVisible, setModalVisible] = useState(false);

   function handleCloseModal() {
      setModalVisible(false);
   }

   async function handleOpenModalView(id: string) {
      const apiCliente = setupAPIClient();
      const response = await apiCliente.get("/order/detail", {
         params: {
            order_id: id,
         },
      });
      setModalItem(response.data);
      setModalVisible(true);
   }

   Modal.setAppElement("#__next");

   return (
      <>
         <Head>
            <title>Painel - Moreira Pizzas</title>
         </Head>
         <div>
            <Header />
            <main className={styles.container}>
               <div className={styles.containerHeader}>
                  <h1>Últimos pedidos</h1>
                  <button>
                     <FiRefreshCcw color="#3FFFA3" size={25} />
                  </button>
               </div>

               <article className={styles.listOrders}>
                  {orderList.map((item) => (
                     <section key={item.id} className={styles.orderItem}>
                        <button onClick={() => handleOpenModalView(item.id)}>
                           <div className={styles.tag}></div>
                           <span>Mesa {item.table}</span>
                        </button>
                     </section>
                  ))}
               </article>
            </main>
            {modalVisible && (
               <ModalOrder
                  isOpen={modalVisible}
                  onRequestClose={handleCloseModal}
                  order={modalItem}
               />
            )}
         </div>
      </>
   );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
   const apiCliente = setupAPIClient(ctx);

   const response = await apiCliente.get("/orders");

   // console.log(response.data);
   return {
      props: {
         orders: response.data,
      },
   };
});
