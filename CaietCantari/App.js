require("react-devtools-core").connectToDevTools({ port: 19000 });
import React from "react";
import { StyleSheet, View } from "react-native";
import NavBar from "./Components/NavBar";
import SongList from "./Components/SongList";

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
});

export default App;
