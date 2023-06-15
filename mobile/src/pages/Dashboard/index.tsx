import React, { useContext } from "react";
import {
   View,
   Text,
   SafeAreaView,
   TouchableOpacity,
   TextInput,
   StyleSheet,
} from "react-native";

import { AuthContext } from "../../contexts/AuthContext";

export default function DashBoard() {
   const { signOut } = useContext(AuthContext);

   return (
      <SafeAreaView style={styles.container}>
         <Text style={styles.title}>Novo Pedido</Text>

         <TextInput
            placeholder="Numero da mesa"
            placeholderTextColor="#f0f0f0"
            style={styles.input}
            keyboardType="numeric"
         />

         <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Abrir mesa</Text>
         </TouchableOpacity>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 15,
      backgroundColor: "#1d1d2e",
   },
   title: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#fff",
      marginBottom: 24,
   },
   input: {
      width: "90%",
      height: 60,
      backgroundColor: "#101026",
      borderRadius: 4,
      paddingHorizontal: 8,
      textAlign: "center",
      fontSize: 25,
      color: "#fff",
   },
   button: {
      width: "90%",
      height: 40,
      backgroundColor: "#3fffa3",
      borderRadius: 4,
      marginVertical: 12,
      justifyContent: "center",
      alignItems: "center",
   },
   buttonText: {
      fontSize: 18,
      color: "#101026",
      fontWeight: "bold",
   },
});
