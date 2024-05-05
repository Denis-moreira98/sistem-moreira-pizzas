import styles from "./styles.module.scss";

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
   async function handleDelete(id) {
      alert(`Deletado: ${id}`);
   }

   return (
      <div className={styles.card}>
         <div className={styles.img}>
            <img src={`${process.env.BASE_URL_IMG}/${banner}`} alt={name} />
         </div>
         <div className={styles.info}>
            <h2>{name}</h2>
            <p>{description}</p>
            <span>Preço: R${price}</span>
            <div className={styles.buttons}>
               <button>Editar</button>
               <button onClick={() => handleDelete(id)}>Excluir</button>
            </div>
         </div>
      </div>
   );
}
