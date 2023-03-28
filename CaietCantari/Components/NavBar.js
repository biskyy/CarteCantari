import React from "react";
import { Text, StyleSheet, View, SafeAreaView, StatusBar } from "react-native";
import Constants from "expo-constants";
import Separator from "./Separator";

const NavBar = () => {
  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <View style={styles.mainDiv}>
        <Text style={styles.text}>Caiet de Cantari</Text>
      </View>
      <Separator />
    </>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    backgroundColor: "black", // raisin black: #1A181B
    color: "white",
    paddingTop: Constants.statusBarHeight - StatusBar.currentHeight + 10,
    paddingBottom: 15,
    width: "100%",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
  },
});

export default NavBar;
