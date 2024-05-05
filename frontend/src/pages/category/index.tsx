import Head from "next/head";
import { Header } from "@/components/Header";
import styles from "./styles.module.scss";
import { useState, FormEvent } from "react";
import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { CardCategory } from "@/components/CardCategory";
import { useRouter } from "next/navigation";

type ItemProps = {
   id: string;
   name: string;
};

interface categoryProps {
   categoryList: ItemProps[];
}

export default function Category({ categoryList }: categoryProps) {
   const [name, setName] = useState("");
   const [categories, setCategories] = useState(categoryList || []);
   const router = useRouter();

   async function handleRegister(event: FormEvent) {
      event.preventDefault();

      if (name === "") {
         return;
      }

      const apiClient = setupAPIClient();
      await apiClient.post("/category", {
         name: name,
      });
      setName("");
      router.refresh();
   }

   return (
      <>
         <Head>
            <title>Nova Categoria - Moreira Pizzas</title>
         </Head>
         <div>
            <Header />
            <main className={styles.container}>
               <h1>Cadastrar categorias</h1>

               <form className={styles.form} onSubmit={handleRegister}>
                  <input
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     type="text"
                     placeholder="Digite o nome da categoria"
                     className={styles.input}
                  />

                  <button className={styles.button} type="submit">
                     Cadastrar
                  </button>
               </form>

               {categories.map((category) => (
                  <CardCategory
                     key={category.id}
                     name={category.name}
                     id={category.id}
                  />
               ))}
            </main>
         </div>
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
