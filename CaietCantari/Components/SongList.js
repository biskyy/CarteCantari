import Cantari from "../Cantari.json";
import React from "react";
import { useState } from "react";
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
  const [[cantare, numarCantare], setCantare] = useState([false, -1]);

  const cantareEvent = (e) => {
    setCantare([true, 0]);
  };

  const backEvent = () => {
    setCantare([false, -1]);
  };

  const [[isSong, songID], setSong] = useState([false, 0]);

  const displaySong = (index) => {
    setSong([true, index]);
  };

  return (
    <>
      {!cantare &&
        [...Cantari].map((cantare, index) => (
          <Button
            id={index}
            onPress={displaySong(cantare.id)}
            color="#ff5c5c"
            key={index}
            title={cantare.name}
          />
        ))}
      {cantare && [
        ...Cantari.map((cantare, index) => <ScrollView></ScrollView>),
      ]}
      {cantare && <Button onPress={backEvent} title="BACK" />}
    </>
  );
}
