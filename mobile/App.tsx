import { StyleSheet, Text, View, StatusBar } from "react-native";

import SignIn from "./src/pages/SignIn";

export default function App() {
   return (
      <View>
         <StatusBar
            backgroundColor="#1d1d2e"
            barStyle="light-content"
            translucent={false}
         />
         <SignIn />
      </View>
   );
}

const styles = StyleSheet.create({});
