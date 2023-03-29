import React, { useRef } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  Pressable,
} from "react-native";
import Constants from "expo-constants";
import NavBar from "./Components/NavBar";
import SongList from "./Components/SongList";
import SearchBar from "./Components/SearchBar";
import CustomButton from "./Components/CustomButton";

const App = () => {
  const ref = useRef(null);

  const handlePress = (arg1) => {
    console.log(arg1);
  };
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
    backgroundColor: "yellow",
  },
  listaCantari: {
    flex: 1,
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
