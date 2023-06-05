import {
   GetServerSideProps,
   GetServerSidePropsResult,
   GetServerSidePropsContext,
} from "next";
import { parseCookies, destroyCookie } from "nookies";
import { AuthTokenErrors } from "../services/errors/AuthTokenErrors";

// função para paginas que só usuarios logados podem ter acesso

export function canSSRAuth<P>(fn: GetServerSideProps<P>) {
   return async (
      ctx: GetServerSidePropsContext
   ): Promise<GetServerSidePropsResult<P>> => {
      const cookies = parseCookies(ctx);

      const token = cookies["@nextauth.token"];

      if (!token) {
         return {
            redirect: {
               destination: "/",
               permanent: false,
            },
         };
      }
      try {
         return await fn(ctx);
      } catch (err) {
         if (err instanceof AuthTokenErrors) {
            destroyCookie(ctx, "@nextauth.token");
            return {
               redirect: {
                  destination: "/",
                  permanent: false,
               },
            };
         }
      }
   };
}
