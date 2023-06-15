import React, { useState, createContext, ReactNode, useEffect } from "react";

import { api } from "../services/api";

import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextData = {
   user: UseProps;
   isAuthenticated: boolean;
   signIn: (credentials: SignInProps) => Promise<void>;
   loading: boolean;
   loadingAuth: boolean;
   signOut: () => Promise<void>;
};

type UseProps = {
   id: string;
   name: string;
   email: string;
   token: string;
};

type AuthProviderProps = {
   children: ReactNode;
};

type SignInProps = {
   email: string;
   password: string;
};
export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
   const [user, setUser] = useState<UseProps>({
      id: "",
      name: "",
      email: "",
      token: "",
   });

   const [loadingAuth, setLoadingAuth] = useState(false);
   const [loading, setLoading] = useState(true);

   const isAuthenticated = !!user.name;

   useEffect(() => {
      async function getuser() {
         //Pegar os dados salvos do user
         const userInfo = await AsyncStorage.getItem("@moreirapizzas");
         let hasUser: UseProps = JSON.parse(userInfo || "{}");

         //verificar se recebemos as informações dele.
         if (Object.keys(hasUser).length > 0) {
            api.defaults.headers.common[
               "Authorization"
            ] = `Bearer ${hasUser.token}`;

            setUser({
               id: hasUser.id,
               name: hasUser.name,
               email: hasUser.email,
               token: hasUser.token,
            });
         }
         setLoading(false);
      }
      getuser();
   }, []);

   async function signIn({ email, password }: SignInProps) {
      setLoadingAuth(true);

      try {
         const response = await api.post("/session", {
            email,
            password,
         });

         // console.log(response.data);

         const { id, name, token } = response.data;

         const data = {
            ...response.data,
         };

         await AsyncStorage.setItem("@moreirapizzas", JSON.stringify(data));

         api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

         setUser({
            id,
            name,
            email,
            token,
         });

         setLoadingAuth(false);
      } catch (err) {
         console.log("erro ao acessar", err);
         setLoadingAuth(false);
      }
   }

   async function signOut() {
      await AsyncStorage.clear().then(() => {
         setUser({
            id: "",
            name: "",
            email: "",
            token: "",
         });
      });
   }

   return (
      <AuthContext.Provider
         value={{
            user,
            isAuthenticated,
            signIn,
            loading,
            loadingAuth,
            signOut,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
}
