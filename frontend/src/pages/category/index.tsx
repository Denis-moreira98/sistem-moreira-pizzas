import Head from "next/head";
import { Header } from "@/components/Header";
import styles from "./styles.module.scss";
import { useState, FormEvent } from "react";

import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";

export default function Category() {
   const [name, setName] = useState("");

   async function handleRegister(event: FormEvent) {
      event.preventDefault();

      if (name === "") {
         return;
      }
      const apiClient = setupAPIClient();
      await apiClient.post("/category", {
         name: name,
      });

      toast.success("Categoria cadastrada com sucesso");
      setName("");
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
            </main>
         </div>
      </>
   );
}
