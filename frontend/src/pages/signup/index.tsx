import styles from "@/styles/home.module.scss";
import Head from "next/head";
import logoImg from "../../../public/logo.svg";
import Image from "next/image";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import Link from "next/link";

export default function SignUp() {
   return (
      <>
         <Head>
            <title>Faça seu cadastro agora</title>
         </Head>
         <div className={styles.containerCenter}>
            <Image src={logoImg} alt="Moreira Pizzas" className={styles.logo} />

            <div className={styles.login}>
               <h1>Criando sua conta</h1>
               <form>
                  <Input placeholder="Digite seu nome" type="text" />
                  <Input placeholder="Digite seu email" type="text" />
                  <Input placeholder="Digite sua senha" type="password" />
                  <Button type="submit" loading={false}>
                     Cadastrar
                  </Button>
               </form>

               <Link href="/" legacyBehavior>
                  <a className={styles.text}>
                     Já possui uma conta? Faça login!
                  </a>
               </Link>
            </div>
         </div>
      </>
   );
}
