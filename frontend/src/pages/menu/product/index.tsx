import { useState, ChangeEvent, FormEvent } from "react";
import Head from "next/head";
import styles from "./styles.module.scss";
import { Header } from "@/components/Header";

import { canSSRAuth } from "@/utils/canSSRAuth";

import { FiUpload } from "react-icons/fi";

import { setupAPIClient } from "../../../services/api";

import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

type ItemProps = {
   id: string;
   name: string;
};

interface categoryProps {
   categoryList: ItemProps[];
}

export default function Product({ categoryList }: categoryProps) {
   const [name, setName] = useState("");
   const [price, setPrice] = useState("");
   const [description, setDescription] = useState("");

   const [avatarUrl, setAvatarUrl] = useState("");
   const [imageAvatar, setImageAvatar] = useState(null);

   const [categories, setCategories] = useState(categoryList || []);
   const [categorySelected, setCategorySelected] = useState("");

   const router = useRouter();

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

   //Quando você seleciona uma nova categoria na lista
   function handleCategoriesSelected(event) {
      setCategorySelected(event.target.value);
   }

   async function handleRegister(event: FormEvent) {
      event.preventDefault();

      try {
         const data = new FormData();

         if (
            name === "" ||
            price === "" ||
            description === "" ||
            imageAvatar === null
         ) {
            toast.warning("preencha todos os campos");
            return;
         }

         data.append("name", name);
         data.append("price", price);
         data.append("description", description);
         data.append("category_id", categories[categorySelected].id);
         data.append("file", imageAvatar);

         const apiClient = setupAPIClient();
         await apiClient.post("/product", data);

         toast.success("Cadastrado com sucesso!");
         router.push("/menu");
      } catch (err) {
         console.log(err);
         toast.error("Ops, erro ao cadastrar");
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

               <form className={styles.form} onSubmit={handleRegister}>
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

                  <select
                     value={categorySelected}
                     onChange={handleCategoriesSelected}
                  >
                     <option value={undefined}>Selecione uma categoria</option>
                     {categories.map((item, index) => {
                        return (
                           <option key={item.id} value={index}>
                              {item.name}
                           </option>
                        );
                     })}
                  </select>
                  <input
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     className={styles.input}
                     type="text"
                     placeholder="Digite o nome do produto"
                  />
                  <input
                     value={price}
                     onChange={(e) => setPrice(e.target.value)}
                     className={styles.input}
                     type="text"
                     placeholder="Preço do produto"
                  />

                  <textarea
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
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
   const apliClient = setupAPIClient(ctx);

   const response = await apliClient.get("/category");
   //console.log(response.data);

   return {
      props: {
         categoryList: response.data,
      },
   };
});
