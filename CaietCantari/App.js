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
  return (
    <View style={styles.container}>
      <NavBar />
      <View style={styles.listaCantari}>
        <ToateCantarile />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  listaCantari: {
    width: "100%",
  },
});

export default App;
