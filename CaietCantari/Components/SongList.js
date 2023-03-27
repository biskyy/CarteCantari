import Cantari from "../Cantari.json";
import React from "react";
import { useState, useRef } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  ScrollView,
  Dimensions,
} from "react-native";
const windowWidth = Dimensions.get("window").width;

export default function SongList() {
  const [[veziCantare, numarCantare], setCantare] = useState([false, -1]);

  const cantareEvent = (e) => {
    setCantare([true, 0]);
  };

  const backEvent = () => {
    setCantare([false, -1]);
  };

  return (
    <>
      {!veziCantare &&
        [...Cantari].map((cantare, index) => (
          <Button
            id={index}
            onPress={cantareEvent}
            color="black"
            backgroundColor="black"
            key={index}
            title={cantare.content
              .split("\n")[1]
              .replace(". ", index + 1 + ". ")
              .slice(1)}
          />
        ))}
      {veziCantare && <Button onPress={backEvent} title="BACK" />}
    </>
  );
}
