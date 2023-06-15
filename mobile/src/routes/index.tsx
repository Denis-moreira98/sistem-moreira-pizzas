import React, { useContext } from "react";

import { View, ActivityIndicator } from "react-native";

import AppRoutes from "./app.routes";
import AuthRoutes from "./Auth.routes";

import { AuthContext } from "../contexts/AuthContext";

function Routes() {
   const { isAuthenticated } = useContext(AuthContext);
   const loading = false;

   if (loading) {
      return (
         <View
            style={{
               flex: 1,
               backgroundColor: "#1D1D2E",
               justifyContent: "center",
               alignContent: "center",
            }}
         >
            <ActivityIndicator size={55} color="#FFF" />
         </View>
      );
   }

   return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;
