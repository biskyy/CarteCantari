import React, { memo } from "react";
import { Text, StyleSheet, View, StatusBar, Platform } from "react-native";
import Constants from "expo-constants";
import Separator from "./Separator";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const NavBar = () => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <View style={[styles.mainDiv, { paddingTop: insets.top }]}>
        <Text style={styles.text}>Caiet de Cantari</Text>
      </View>
      <Separator />
    </>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    backgroundColor: "#1A181B", // raisin black: #1A181B
    color: "white",
    paddingVertical: 10,
    width: "100%",
  },
  text: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 20,
    backgroundColor: "red"
  },
});

export default memo(NavBar);
