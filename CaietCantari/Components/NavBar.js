import React from "react";
import { Text, StyleSheet, View, SafeAreaView, StatusBar } from "react-native";
import Constants from "expo-constants";

const NavBar = () => {
  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <View style={styles.mainDiv}>
        <Text style={styles.text}>Caiet de Cantari</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    backgroundColor: "black",
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
