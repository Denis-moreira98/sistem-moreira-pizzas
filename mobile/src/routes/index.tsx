import React from "react";

import { View } from "react-native/Libraries/Components/View/View";

import AppRoutes from "./app.routes";
import AuthRoutes from "./Auth.routes";

function Routes() {
   const isAuthenticated = false;
   const loading = false;

   return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;
