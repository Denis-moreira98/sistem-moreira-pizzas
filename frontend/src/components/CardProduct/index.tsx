import { setupAPIClient } from "@/services/api";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";

type ProductPros = {
   id: string;
   name: string;
   description: string;
   price: string;
   banner: string;
};
interface ProductList {
   products: ProductPros;
}

export function CardProduct({ products }: ProductList) {
   const router = useRouter();

   async function handleDelete(id) {
      try {
         const apiClient = setupAPIClient();
         await apiClient.delete(`/product`, {
            params: {
               product_id: id,
            },
         });
         router.refresh();
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <div className={styles.card}>
         <div className={styles.img}>
            <Image
               src={`http://localhost:8080/files/${products.banner}`}
               alt={products.name}
               width={100}
               height={100}
               quality={100}
            />
         </div>
         <div className={styles.info}>
            <h2>{products.name}</h2>
            <p>{products.description}</p>

            <span>R${products.price}</span>

            <div className={styles.buttons}>
               <button onClick={() => router.push(`/menu/edit/${products.id}`)}>
                  Editar
               </button>
               <button onClick={() => handleDelete(products.id)}>
                  Excluir
               </button>
            </div>
         </div>
      </div>
   );
}
