import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
} from "react-native";
import Constants from "expo-constants";
import NavBar from "./Components/NavBar";
import ToateCantarile from "./Components/ToateCantarile";

const App = () => {
  console.log(ToateCantarile[0].id)
  return (
    <View style={styles.container}>
      <NavBar />
      <ToateCantarile/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default App;
