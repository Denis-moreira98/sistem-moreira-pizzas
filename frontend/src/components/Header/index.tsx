import styles from "./style.module.scss";
import Link from "next/link";

import { FiLogOut } from "react-icons/fi";

import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export function Header() {
   const { signOut } = useContext(AuthContext);

   return (
      <header className={styles.headerContainer}>
         <div className={styles.headerContent}>
            <Link href={"/dashboard"}>
               <img src="/logo.svg" width={190} height={60} />
            </Link>

            <nav className={styles.menuNav}>
               <Link legacyBehavior href={"/category"}>
                  <a>Categoria</a>
               </Link>
               <Link legacyBehavior href={"/product"}>
                  <a>Cardapio</a>
               </Link>

               <button onClick={signOut}>
                  <FiLogOut color="#FFF" size={28} />
               </button>
            </nav>
         </div>
      </header>
   );
}
