import { useState, ChangeEvent } from "react";
import Head from "next/head";
import styles from "./style.module.scss";
import { Header } from "@/components/Header";

import { canSSRAuth } from "../../utils/canSSRAuth";

import { FiUpload } from "react-icons/fi";

export default function Product() {
   const [avatarUrl, setAvatarUrl] = useState("");
   const [imageAvatar, setImageAvatar] = useState(null);

   function handleFile(e: ChangeEvent<HTMLInputElement>) {
      if (!e.target.files) {
         return;
      }
      const image = e.target.files[0];

      if (!image) {
         return;
      }
      if (image.type === "image/jpeg" || image.type === "image/png") {
         setImageAvatar(image);
         setAvatarUrl(URL.createObjectURL(e.target.files[0]));
      }
   }

   return (
      <>
         <Head>
            <title>Produtos - Moreira Pizzas</title>
         </Head>
         <div>
            <Header />
            <main className={styles.container}>
               <h1>Novo Produto</h1>

               <form className={styles.form}>
                  <label className={styles.labelAvatar}>
                     <span>
                        <FiUpload size={30} color="#FFF" />
                     </span>
                     <input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handleFile}
                     />

                     {avatarUrl && (
                        <img
                           className={styles.preview}
                           src={avatarUrl}
                           alt="foto do produto"
                           width={250}
                           height={250}
                        />
                     )}
                  </label>

                  <select>
                     <option>Bebidas</option>
                     <option>Pizzas</option>
                  </select>
                  <input
                     className={styles.input}
                     type="text"
                     placeholder="Digite o nome do produto"
                  />
                  <input
                     className={styles.input}
                     type="text"
                     placeholder="Preço do produto"
                  />

                  <textarea
                     className={styles.input}
                     placeholder="Descreva seu produto..."
                  />

                  <button className={styles.buttonAdd} type="submit">
                     Cadastrar
                  </button>
               </form>
            </main>
         </div>
      </>
   );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
   return {
      props: {},
   };
});
