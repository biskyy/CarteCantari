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
import NavBar from "./NavBar";
import ProcessToateCantarile from './ToateCantarile/ProcessToateCantarile';

const App = () => {
  return (
    <View style={styles.container}>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    padding:20,
  },
  
 
});

export default App;
