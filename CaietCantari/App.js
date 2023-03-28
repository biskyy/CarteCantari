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
import SongList from "./Components/SongList";
import SearchBar from "./Components/SearchBar";
import CustomButton from "./Components/CustomButton";

const App = () => {
  return (
    <>
      <View style={styles.container}>
        <CustomButton
          style={styles.button}
          titleStyle={styles.buttonText}
          title="test"
          onPress={() => {
            console.log("Hi");
          }}
        />
      </View>
      {/* <View style={styles.container}>
        <NavBar />
        <View style={styles.listaCantari}>
          <SongList />
        </View>
      </View>
      <SearchBar /> */}
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
