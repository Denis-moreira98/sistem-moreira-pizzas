import { canSSRAuth } from "@/utils/canSSRAuth";
import Head from "next/head";
import { Header } from "@/components/Header";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import { CardProduct } from "@/components/CardProduct";
import { setupAPIClient } from "@/services/api";

type ProductProps = {
   id: string;
   name: string;
   price: string;
   description: string;
   banner: string;
};

type CategoryItem = {
   id: string;
   name: string;
   products: ProductProps[];
};

interface CategoryProps {
   categoryList: CategoryItem[];
}

export default function Menu({ categoryList }: CategoryProps) {
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
                  onClick={() => router.push("/menu/product")}
               >
                  Novo Produto
               </button>
            </main>

            {categoryList.map(
               (category) =>
                  category.products.length > 0 && (
                     <div key={category.id}>
                        <h1 className={styles.category}>{category.name}</h1>
                        <div className={styles.grid_cards}>
                           {category.products.map((product) => (
                              <CardProduct
                                 key={product.id}
                                 products={product}
                              />
                           ))}
                        </div>
                     </div>
                  )
            )}
         </section>
      </>
   );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
   const apiClient = setupAPIClient(ctx);

   const response = await apiClient.get("/category");

   return {
      props: {
         categoryList: response.data,
      },
   };
});
