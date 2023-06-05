import { promises } from "dns";
import { createContext, ReactNode, useState } from "react";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import Router from "next/router";
import { api } from "../services/apiClient";

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

   async function signIn({ email, password }: SignInProps) {
      try {
         const response = await api.post("/session", {
            email,
            password,
         });

         const { id, name, token } = response.data;

         setCookie(undefined, "@nextauth.token", token, {
            maxAgr: 60 * 60 * 24 * 30, // expira em 1 mês
            path: "/", //Quais caminhos terão acesso ao cookies
         });

         setUser({
            id,
            name,
            email,
         });
         //Passar para proximas requisições o token
         api.defaults.headers["Authorization"] = `Bearer ${token}`;

         //Redidecionar o user para /dashboard
         Router.push("/dashboard");
      } catch (err) {
         console.log("ERRO AO ACESSAR");
      }
   }

   async function signUp({ name, email, password }: signUpProps) {
      try {
         const response = await api.post("/users", {
            name,
            email,
            password,
         });

         Router.push("/");
      } catch (err) {
         console.log("erro ao deslogar");
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
