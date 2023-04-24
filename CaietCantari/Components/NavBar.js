import React from "react";
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import Separator from "./Separator";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { imageSize, themeAtom, themeButtonKey } from "./State";
import { useAtom } from "jotai";
import { longPressHandler } from "../Screens/Game/LongPressHandler";
import { Ionicons } from "@expo/vector-icons";

const NavBar = (props) => {
  const [theme, setTheme] = useAtom(themeAtom);
  const insets = useSafeAreaInsets();
  const route = useRoute();

  const handleDarkModeButton = async () => {
    try {
      if ((await AsyncStorage.getItem(themeButtonKey)) == "dark") {
        await AsyncStorage.setItem(themeButtonKey, "light");
        setTheme("light");
      } else {
        await AsyncStorage.setItem(themeButtonKey, "dark");
        setTheme("dark");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleHamburgerMenu = () => {
    Keyboard.dismiss();
    props.navigation.toggleDrawer();
  };

  const bgColor = theme == "dark" ? "black" : "white";
  const txtColor = theme == "dark" ? "white" : "black";
  const statusBarTheme = theme == "dark" ? "light-content" : "dark-content";
  const backgroundColorTheme = theme == "dark" ? "black" : "white";

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
      fontWeight: "bold",
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    image: { maxHeight: 35, maxWidth: 35 },
    darkModeButton: { flexGrow: 1 },
  });

  return (
    <>
      <StatusBar
        barStyle={statusBarTheme}
        backgroundColor={backgroundColorTheme}
      />
      <View style={[styles.mainDiv, { paddingTop: insets.top }]}>
        {props.mainScreen && (
          <TouchableOpacity
            onPress={handleHamburgerMenu}
            style={[styles.darkModeButton, styles.image, { marginLeft: 10 }]}
          >
            <Ionicons name="menu-outline" size={imageSize} color={txtColor} />
          </TouchableOpacity>
        )}
        <Text style={[styles.text]}>
          {route.name == "SongDisplay" ? "Caiet de cantari" : route.name}
        </Text>
        <TouchableOpacity
          onPress={handleDarkModeButton}
          delayLongPress={2048}
          onLongPress={() => longPressHandler(props.navigation, route.name)}
          style={[styles.darkModeButton, styles.image, { marginRight: 10 }]}
        >
          <Ionicons name="contrast-sharp" size={imageSize} color={txtColor} />
        </TouchableOpacity>
      </View>
      <Separator backgroundColor={txtColor} />
    </>
  );
};

export default NavBar;
