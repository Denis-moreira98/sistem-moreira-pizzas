import { createContext, ReactNode, useState, useEffect } from "react";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import Router from "next/router";
import { api } from "../services/apiClient";

import { toast } from "react-toastify";

type AuthContextData = {
   user: UserProps;
   isAuthenticated: boolean;
   signIn: (credentials: SignInProps) => Promise<void>;
   signOut: () => void;
   signUp: (credentials: SignInProps) => Promise<void>;
};
type UserProps = {
   id: string;
   name: string;
   email: string;
};

type SignInProps = {
   email: string;
   password: string;
};

type signUpProps = {
   name: string;
   email: string;
   password: string;
};

type AuthProviderProps = {
   children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
   try {
      destroyCookie(undefined, "@nextauth.token");
      Router.push("/");
   } catch {
      console.log("erro ao deslogar");
   }
}

export function AuthProvider({ children }: AuthProviderProps) {
   const [user, setUser] = useState<UserProps>();

   const isAuthenticated = !!user;

   useEffect(() => {
      //TENTAR PEGAR ALGO DO TOKEN NO COOKIES
      const { "@nextauth.token": token } = parseCookies();
      if (token) {
         api.get("/me")
            .then((Response) => {
               const { id, name, email } = Response.data;
               setUser({
                  id,
                  name,
                  email,
               });
            })
            .catch(() => {
               // Caiu aqui é porque o token não foi validado
               // então deslogamos o user
               signOut();
            });
      }
   }, []);

   async function signIn({ email, password }: SignInProps) {
      try {
         const response = await api.post("/session", {
            email,
            password,
         });
         const { id, name, token } = response.data;

         setCookie(undefined, "@nextauth.token", token, {
            maxAge: 60 * 60 * 24 * 15, // expira em 15 dias
            path: "/", // Quais caminhos terão acesso ao cookies
         });

         setUser({
            id,
            name,
            email,
         });

         api.defaults.headers["Authorization"] = `Bearer ${token}`;

         toast.success("Logado com sucesso!");
         Router.push("/dashboard");
      } catch (err) {
         toast.error("Digite seu email e senha corretamente!");
         console.error("Erro ao logar:", err);
      }
   }

   async function signUp({ name, email, password }: signUpProps) {
      try {
         const response = await api.post("/users", {
            name,
            email,
            password,
         });

         const { id, token } = response.data;

         // Configuração do cookie
         const cookieOptions = {
            maxAge: 60 * 60 * 24 * 30, // expira em 1 mês
            path: "/", // Quais caminhos terão acesso ao cookies
         };

         setCookie(undefined, "@nextauth.token", token, cookieOptions);

         setUser({
            id,
            name,
            email,
         });

         api.defaults.headers["Authorization"] = `Bearer ${token}`;

         toast.success("Conta criada com sucesso!");
         Router.push("/dashboard");
      } catch (err) {
         toast.error("Erro ao cadastrar!");
         console.error("Erro ao cadastrar:", err);
      }
   }

   return (
      <AuthContext.Provider
         value={{ user, isAuthenticated, signIn, signOut, signUp }}
      >
         {children}
      </AuthContext.Provider>
   );
}
