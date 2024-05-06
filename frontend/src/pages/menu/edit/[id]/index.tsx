import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Head from "next/head";
import styles from "./styles.module.scss";
import { Header } from "@/components/Header";
import { FiUpload } from "react-icons/fi";
import { setupAPIClient } from "@/services/api";
import { toast } from "react-toastify";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { useRouter } from "next/router";

interface ItemProps {
   id: string;
   name: string;
}
interface EditProductProps {
   categoryList: ItemProps[];
}

export default function EditProduct({ categoryList }: EditProductProps) {
   const [name, setName] = useState("");
   const [price, setPrice] = useState("");
   const [description, setDescription] = useState("");
   const [avatarUrl, setAvatarUrl] = useState("");
   const [imageAvatar, setImageAvatar] = useState<File | null>(null);
   const [categories, setCategories] = useState(categoryList);
   const [categorySelected, setCategorySelected] = useState("");

   const router = useRouter();
   const { id } = router.query;

   useEffect(() => {
      async function getProduct() {
         try {
            const apiClient = setupAPIClient();
            const response = await apiClient.get(`/products`);
            const products = response.data;

            const product = products.find((p) => p.id === String(id));

            if (product) {
               setName(product.name);
               setPrice(product.price);
               setDescription(product.description);
               setAvatarUrl(`http://localhost:8080/files/${product.banner}`);
               setCategorySelected(product.category_id);
            }
         } catch (error) {
            console.error("Erro ao buscar o produto:", error);
         }
      }

      getProduct();
   }, [id]);

   function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
      const file = e.target.files?.[0];
      if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
         setImageAvatar(file);
         setAvatarUrl(URL.createObjectURL(file));
      } else {
         toast.error("Por favor, selecione uma imagem válida (JPEG ou PNG).");
      }
   }

   function handleCategoriesSelected(event: ChangeEvent<HTMLSelectElement>) {
      setCategorySelected(event.target.value);
   }

   async function handleEditProduct(event: FormEvent) {
      event.preventDefault();

      try {
         const data = new FormData();

         if (name === "" || price === "" || description === "") {
            toast.warning("Preencha todos os campos");
            return;
         }

         data.append("name", name);
         data.append("price", price);
         data.append("description", description);
         data.append("category_id", categorySelected);
         data.append("file", imageAvatar);
         const apiClient = setupAPIClient();
         await apiClient.patch(`/product/edit?product_id=${id}`, data);

         toast.success("Editado com sucesso!");
         router.push("/menu");
      } catch (err) {
         console.log(categorySelected);
         toast.error("Ops, erro ao editar!");
      }
   }

   return (
      <>
         <Head>
            <title>Editar Produto {name} - Moreira Pizzas</title>
         </Head>
         <div>
            <Header />
            <main className={styles.container}>
               <h1>Editar Produto</h1>
               <form className={styles.form} onSubmit={handleEditProduct}>
                  <label className={styles.labelAvatar}>
                     <span>
                        <FiUpload size={30} color="#FFF" />
                     </span>
                     <input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handleFileChange}
                     />
                     {avatarUrl && (
                        <img
                           className={styles.preview}
                           src={avatarUrl}
                           alt="Foto do produto"
                           width={250}
                           height={250}
                        />
                     )}
                  </label>
                  <select
                     value={categorySelected}
                     onChange={handleCategoriesSelected}
                  >
                     <option value="">Selecione uma categoria</option>
                     {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                           {category.name}
                        </option>
                     ))}
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
                     Salvar
                  </button>
               </form>
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
