import { setupAPIClient } from "@/services/api";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ProductPros {
   id: string;
   name: string;
   description: string;
   price: string;
   banner: string;
}

export function CardProduct({
   id,
   name,
   description,
   price,
   banner,
}: ProductPros) {
   const router = useRouter();

   async function handleDelete(id) {
      try {
         const api = setupAPIClient();
         api.delete(`/product/?product_id=${id}`);
         router.push("/menu");
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <div className={styles.card}>
         <div className={styles.img}>
            <Image
               src={`http://localhost:8080/files/${banner}`}
               alt={name}
               width={100}
               height={100}
               quality={100}
            />
         </div>
         <div className={styles.info}>
            <h2>{name}</h2>
            <p>{description}</p>

            <span>R${price}</span>

            <div className={styles.buttons}>
               <button>Editar</button>
               <button onClick={() => handleDelete(id)}>Excluir</button>
            </div>
         </div>
      </div>
   );
}
