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

const App = () => {
  return (
    <View style={styles.container}>
      <NavBar />
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
