import React, { memo, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import Separator from "./Separator";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { themeAtom, themeButtonKey } from "./State";
import { useAtom } from "jotai";

const lightModeIcon = require("../assets/icons/light-mode-icon.png");
const darkModeIcon = require("../assets/icons/dark-mode-icon.png");

const NavBar = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  const insets = useSafeAreaInsets();

  const handleDarkModeButton = async () => {
    try {
      if ((await AsyncStorage.getItem(themeButtonKey)) == "dark") {
        await AsyncStorage.setItem(themeButtonKey, "light");
        setTheme("light")
      } else {
        await AsyncStorage.setItem(themeButtonKey, "dark");
        setTheme("dark")
      }
      console.log(await AsyncStorage.getItem(themeButtonKey));
    } catch (err) {
      console.error(err);
    }
  };

  const bgColor = theme == "dark" ? "black" : "white";
  const txtColor = theme == "dark" ? "white" : "black";
  const themeIcon = theme == "dark" ? darkModeIcon : lightModeIcon
  const statusBarTheme = theme == "dark" ? "light-content" : "dark-content"

  const styles = StyleSheet.create({
    mainDiv: {
      backgroundColor: bgColor, // raisin black: #1A181B
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: txtColor,
      fontSize: 25,
      margin: 10,
      marginLeft: 15,
      fontWeight: "bold",
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    image: { maxHeight: 35, maxWidth: 35 },
    darkModeButton: { flexGrow: 1, marginRight: 15 },
  });

  return (
    <>
      <StatusBar barStyle={statusBarTheme} />
      <View style={[styles.mainDiv, { paddingTop: insets.top }]}>
        <Text style={[styles.text]}>Caiet de Cantari</Text>
        <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.clear();
            console.log("cleared");
          }}
        >
          <Text style={{ color: txtColor }}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            console.log("-------------------------")
            console.log("astorage: ")
            console.log(await AsyncStorage.getItem(themeButtonKey));
            console.log("atom: ")
            console.log(theme)
            console.log("-------------------------")
          }}
        >
          <Text style={{ color: txtColor }}>Get curr</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDarkModeButton}
          style={[styles.darkModeButton, styles.image]}
        >
          <Image style={styles.image} source={themeIcon} />
        </TouchableOpacity>
      </View>
      <Separator backgroundColor={txtColor}/>
    </>
  );
};

// const styles = StyleSheet.create({
//   mainDiv: {
//     // backgroundColor: "black", // raisin black: #1A181B
//     color: "white",
//     width: "100%",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   text: {
//     // color: "white",
//     fontSize: 25,
//     margin: 10,
//     marginLeft: 15,
//     fontWeight: "bold",
//     flexGrow: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   image: { maxHeight: 35, maxWidth: 35 },
//   darkModeButton: { flexGrow: 1, marginRight: 15 },
// });

export default memo(NavBar);
