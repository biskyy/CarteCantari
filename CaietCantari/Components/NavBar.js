import React from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import Constants from "expo-constants";
import Separator from "./Separator";

const smthForNavBar = Platform.OS == "ios" ? 0 : 5;

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
    paddingTop:
      Constants.statusBarHeight - StatusBar.currentHeight + smthForNavBar,
    paddingBottom: 10,
    width: "100%",
  },
  text: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 20,
  },
});

export default NavBar;
