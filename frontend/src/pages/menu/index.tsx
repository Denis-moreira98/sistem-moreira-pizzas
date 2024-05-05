import { canSSRAuth } from "@/utils/canSSRAuth";
import Head from "next/head";
import { Header } from "@/components/Header";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import { CardProduct } from "@/components/CardProduct";
import { setupAPIClient } from "@/services/api";

type ProductItem = {
   id: string;
   name: string;
   price: string;
   description: string;
   banner: string;
};

interface ProductProps {
   productList: ProductItem[];
}

export default function Menu({ productList }: ProductProps) {
   const router = useRouter();
   return (
      <>
         <Header />
         <Head>
            <title>Cardápio</title>
         </Head>

         <section className={styles.container}>
            <main className={styles.menu}>
               <h1>Meus produtos</h1>
               <button
                  className={styles.button}
                  onClick={() => router.push("/product")}
               >
                  Novo Produto
               </button>
            </main>
            <div className={styles.grid_cards}>
               {productList.map((product) => (
                  <CardProduct
                     key={product.id}
                     id={product.id}
                     name={product.name}
                     description={product.description}
                     price={product.price}
                     banner={product.banner}
                  />
               ))}
            </div>
         </section>
      </>
   );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
   const apiClient = setupAPIClient(ctx);

   const response = await apiClient.get("/products");
   // console.log(response.data);

   return {
      props: {
         productList: response.data,
      },
   };
});
