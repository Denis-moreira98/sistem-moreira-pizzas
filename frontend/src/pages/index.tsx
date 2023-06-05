import { useContext, FormEvent, useState } from "react";
import styles from "@/styles/home.module.scss";
import Head from "next/head";
import logoImg from "../../public/logo.svg";
import Image from "next/image";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

import Link from "next/link";

import { GetServerSideProps } from "next";

import { canSSRGuest } from "../utils/canSSRGuest";

export default function Home() {
   const { signIn } = useContext(AuthContext);

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const [loading, setLoading] = useState(false);

   async function handleLogin(event: FormEvent) {
      event.preventDefault();

      if (email === "" || password === "") {
         toast.warning("Preencha todos os campos!");
      }

      setLoading(true);

      let data = {
         email,
         password,
      };

      await signIn(data);

      setLoading(false);
   }

   return (
      <>
         <Head>
            <title>Moreira Pizzas - Faça seu login</title>
         </Head>
         <div className={styles.containerCenter}>
            <Image src={logoImg} alt="Moreira Pizzas" className={styles.logo} />

            <div className={styles.login}>
               <form onSubmit={handleLogin}>
                  <Input
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder="Digite seu email"
                     type="text"
                  />
                  <Input
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     placeholder="Digite sua senha"
                     type="password"
                  />
                  <Button type="submit" loading={loading}>
                     Acessar
                  </Button>
               </form>

               <Link href="/signup" legacyBehavior>
                  <a className={styles.text}>
                     Não possui uma conta? Cadastre-se
                  </a>
               </Link>
            </div>
         </div>
      </>
   );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
   return {
      props: {},
   };
});
