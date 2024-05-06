import { canSSRAuth } from "@/utils/canSSRAuth";
import styles from "./styles.module.scss";
import { setupAPIClient } from "@/services/api";
import { useRouter } from "next/navigation";

interface categoryProps {
   id: string;
   name: string;
}

export function CardCategory({ id, name }: categoryProps) {
   const router = useRouter();

   async function handleDelete(id) {
      try {
         const api = setupAPIClient();
         await api.delete("/category", {
            params: {
               category_id: id,
            },
         });
         router.refresh();
      } catch (error) {
         console.log(error);
      }
   }
   return (
      <section className={styles.card}>
         <span>{name}</span>
         <div className={styles.div_buttons}>
            <button className={styles.button2} onClick={() => handleDelete(id)}>
               Excluir
            </button>
         </div>
      </section>
   );
}
export const getServerSideProps = canSSRAuth(async (ctx) => {
   return {
      props: {},
   };
});
