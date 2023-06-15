import React from "react";

import { View, ActivityIndicator } from "react-native";

import AppRoutes from "./app.routes";
import AuthRoutes from "./Auth.routes";

function Routes() {
   const isAuthenticated = false;
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
