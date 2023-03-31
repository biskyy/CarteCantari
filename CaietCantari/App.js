import React, { useRef } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  Pressable,
  TextInput,
} from "react-native";
import Constants from "expo-constants";
import NavBar from "./Components/NavBar";
import SongList from "./Components/SongList";
import BottomBar from "./Components/BottomBar";
import CustomButton from "./Components/CustomButton";

const App = () => {
  return (
    <>
      <View style={styles.container}>
        <NavBar />
        <View style={styles.listaCantari}>
          <SongList />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "",
  },
  listaCantari: {
    flex: 17,
    width: "100%",
  },
  button: {
    width: "50%",
    height: 100,
    backgroundColor: "black",
  },
  buttonText: {
    color: "white",
    backgroundColor: "red",
    fontSize: 20,
  },
});

export default App;
