import Cantari from "../Cantari.json"
 import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
} from "react-native";

export default function ToateCantarile(){
    return(
        <Text>{Cantari[0].id} </Text>
    )
}