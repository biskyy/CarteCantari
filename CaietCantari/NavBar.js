import React from "react";
import { Text, StyleSheet, View, SafeAreaView, StatusBar } from "react-native";

const NavBar = () => {
  return (
    <>
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
    marginTop: -50,
    paddingTop: 50,
    width: "100%",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default NavBar;
