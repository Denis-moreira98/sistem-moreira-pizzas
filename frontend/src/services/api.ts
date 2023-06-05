import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { AuthTokenErrors } from "./errors/AuthTokenErrors";

import { signOut } from "../contexts/AuthContext";

export function setupAPIClient(ctx = undefined) {
   let cookies = parseCookies(ctx);

   const api = axios.create({
      baseURL: "http://localhost:3333",
      headers: {
         Authorization: `Bearer ${cookies["@nextauth.token"]}`,
      },
   });

   api.interceptors.response.use(
      (response) => {
         return response;
      },
      (error: AxiosError) => {
         if (error.response.status === 401) {
            //Qualquer erro 401 (não autorizado) devemos deslogar o usuario
            if (typeof window !== undefined) {
               // chamar a função para deslogar usuario
               signOut();
            } else {
               return Promise.reject(new AuthTokenErrors());
            }
         }
         return Promise.reject(error);
      }
   );

   return api;
}
