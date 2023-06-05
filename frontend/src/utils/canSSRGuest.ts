import {
   GetServerSideProps,
   GetServerSidePropsResult,
   GetServerSidePropsContext,
} from "next";
import { parseCookies } from "nookies";

// função para paginas que só podem ser acessadas por visitantes

export function canSSRGuest<P>(fn: GetServerSideProps<P>) {
   return async (
      ctx: GetServerSidePropsContext
   ): Promise<GetServerSidePropsResult<P>> => {
      const cookies = parseCookies(ctx);

      //se o cara tentar acessar a pagina porem tendo já um login salvo redirecionamos
      if (cookies["@nextauth.token"]) {
         return {
            redirect: {
               destination: "/dashboard",
               permanent: false,
            },
         };
      }

      return await fn(ctx);
   };
}
